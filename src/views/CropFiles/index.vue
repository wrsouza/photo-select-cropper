<template>
  <div>
    <close-bar @changeView="changeView" />
    <container>
      <canvas-container>
        <canvas ref="canvas"></canvas>
      </canvas-container>
      <crop-tools
        :image="image"
        :crop="crop"
        @draw="draw"
        @confirm="confirm"
        @changeView="changeView"
      ></crop-tools>
    </container>
  </div>
</template>

<script>
import loadFile from '@/services/files';
import loadImage from '@/services/images';

import CloseBar from '@/components/CloseBar';
import { Container, CanvasContainer } from './styles';
import CropTools from '@/components/CropTools';

import render from '@/services/render';

export default {
  name: 'CropFiles',
  props: ['params'],
  data() {
    return {
      canvas: null,
      context: null,
      mouse: {
        status: false,
        x: null,
        y: null,
      },
      border: 20,
      color: 'rgba(0,0,0,0.7)',
      crop: {
        width: 200,
        height: 200,
        x: 0,
        y: 0,
        scale: 1,
      },
      image: {
        resource: null,
        width: null,
        height: null,
        x: null,
        y: null,
        scale: null,
        rotate: null,
        grayscale: null,
      },
    };
  },
  components: {
    CloseBar,
    Container,
    CanvasContainer,
    CropTools,
  },
  methods: {
    changeView(view) {
      this.close();
      this.$emit('changeView', view);
    },
    touchStart(e) {
      e.preventDefault();
      this.mouse.status = true;
      this.mouse.x = e.touches[0].clientX;
      this.mouse.y = e.touches[0].clientY;
    },
    touchMove(e) {
      e.preventDefault();
      if (this.mouse.status) {
        let px = e.touches[0].clientX;
        let py = e.touches[0].clientY;
        this.move(px, py, false);
      }
    },
    touchEnd(e) {
      e.preventDefault();
      this.mouse.status = false;
    },
    mDown(e) {
      this.mouse.status = true;
      this.mouse.x = e.clientX - e.target.offsetLeft;
      this.mouse.y = e.clientY - e.target.offsetTop;
    },
    mMove(e) {
      if (this.mouse.status) {
        let px = e.clientX - e.target.offsetLeft;
        let py = e.clientY - e.target.offsetTop;
        this.move(px, py, e.altKey);
      }
    },
    mUp(e) {
      this.mouse.status = false;
    },
    move(px, py, altKey) {
      if (altKey) {
        this.image.scale = this.image.scale - (py - this.mouse.y) * 0.001;
        this.image.x =
          this.image.x -
          (this.image.resource.width * this.image.scale - this.image.width) / 2;
        this.image.y =
          this.image.y -
          (this.image.resource.height * this.image.scale - this.image.height) /
            2;
        this.image.width = this.image.resource.width * this.image.scale;
        this.image.height = this.image.resource.height * this.image.scale;
      } else {
        switch (this.image.rotate) {
          case 90:
            this.image.y += this.mouse.x - px;
            this.image.x += py - this.mouse.y;
            break;
          case 180:
            this.image.x += this.mouse.x - px;
            this.image.y += this.mouse.y - py;
            break;
          case 270:
            this.image.x += this.mouse.y - py;
            this.image.y += px - this.mouse.x;
            break;
          default:
            this.image.x += px - this.mouse.x;
            this.image.y += py - this.mouse.y;
        }
      }
      this.mouse.x = px;
      this.mouse.y = py;
      this.draw();
    },
    calc() {
      if (window.innerWidth >= 900) {
        this.canvas.width = window.innerWidth - 260;
        this.canvas.height = window.innerHeight - 50;
      } else if (window.innerWidth >= 700 && window.innerWidth < 900) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 260 - 50;
      } else {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 160 - 50;
      }

      if (
        this.crop.width > this.canvas.width - this.border * 2 ||
        this.crop.height > this.canvas.height - this.border * 2
      ) {
        const wRatio = (this.canvas.width - this.border * 2) / this.crop.width;
        const hRatio =
          (this.canvas.height - this.border * 2) / this.crop.height;
        this.crop.scale = wRatio > hRatio ? hRatio : wRatio;
      } else {
        this.crop.scale = 1;
      }
      this.crop.x = (this.canvas.width - this.crop.width * this.crop.scale) / 2;
      this.crop.y =
        (this.canvas.height - this.crop.height * this.crop.scale) / 2;
    },
    calcImage() {
      const { crop } = this.params.listFiles[this.params.cropIndex];
      this.image.scale = crop.scale * this.crop.scale;
      this.image.width = crop.width * this.image.scale;
      this.image.height = crop.height * this.image.scale;
      this.image.x = crop.x * this.crop.scale;
      this.image.y = crop.y * this.crop.scale;
      this.image.rotate = crop.rotate;
      this.image.grayscale = crop.grayscale;
    },
    drawBackground() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.save();
      this.context.translate(0, 0);
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.rect(
        this.crop.x,
        this.crop.y,
        this.crop.width * this.crop.scale,
        this.crop.height * this.crop.scale
      );
      this.context.rect(
        this.canvas.width,
        0,
        -this.canvas.width,
        this.canvas.height
      );
      this.context.fill('evenodd');
      this.context.restore();
    },
    drawImage() {
      this.context.save();
      this.context.globalCompositeOperation = 'destination-over';
      this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
      this.context.rotate((this.image.rotate * Math.PI) / 180);
      this.context.filter = `grayscale(${this.image.grayscale}%)`;

      this.context.drawImage(
        this.image.resource,
        this.image.x - this.canvas.width / 2 + this.crop.x,
        this.image.y - this.canvas.height / 2 + this.crop.y,
        this.image.width,
        this.image.height
      );
      this.context.restore();
    },
    draw() {
      this.drawBackground();
      this.drawImage();
    },
    close() {
      this.canvas.removeEventListener('touchstart', this.touchStart);
      this.canvas.removeEventListener('touchmove', this.touchMove);
      this.canvas.removeEventListener('touchend', this.touchEnd);

      this.canvas.removeEventListener('mousedown', this.mDown);
      this.canvas.removeEventListener('mousemove', this.mMove);
      this.canvas.removeEventListener('mouseup', this.mUp);

      window.removeEventListener('resize', this.resize);
    },
    confirm() {
      this.params.listFiles[this.params.cropIndex].crop.scale =
        this.image.scale / this.crop.scale;
      this.params.listFiles[this.params.cropIndex].crop.x =
        this.image.x / this.crop.scale;
      this.params.listFiles[this.params.cropIndex].crop.y =
        this.image.y / this.crop.scale;
      this.params.listFiles[
        this.params.cropIndex
      ].crop.rotate = this.image.rotate;
      this.params.listFiles[
        this.params.cropIndex
      ].crop.grayscale = this.image.grayscale;

      render.renderImage({
        item: this.params.listFiles[this.params.cropIndex],
        width: this.params.width,
        height: this.params.height,
        image: this.image.resource,
      });

      this.changeView('dashboard');
    },
    resize() {
      this.calc();
      this.calcImage();
      this.draw();
    },
  },
  async mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d');
    this.crop.width = this.params.width;
    this.crop.height = this.params.height;

    const data = await loadFile(this.params.listFiles[this.params.cropIndex]);
    this.image.resource = await loadImage(data);

    this.canvas.addEventListener('touchstart', this.touchStart);
    this.canvas.addEventListener('touchmove', this.touchMove);
    this.canvas.addEventListener('touchend', this.touchEnd);

    this.canvas.addEventListener('mousedown', this.mDown);
    this.canvas.addEventListener('mousemove', this.mMove);
    this.canvas.addEventListener('mouseup', this.mUp);

    window.addEventListener('resize', this.resize);

    this.calc();
    this.calcImage();
    this.draw();
  },
};
</script>