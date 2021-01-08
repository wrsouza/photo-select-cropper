import loadFile from './files';
import loadImage from './images';

class CropSystem {
  constructor({ canvas, width, height, image }) {
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.scale = 1;
    this.image = image;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.mouse = {
      status: false,
      x: null,
      y: null,
    };
    this.border = 20;
    this.color = 'rgba(0,0,0,0.7)';

    this.resize = () => {
      this.calc();
    };

    this.canvas.addEventListener('touchstart', this.touchStart);
    this.canvas.addEventListener('touchmove', this.touchMove);
    this.canvas.addEventListener('touchend', this.touchEnd);

    this.canvas.addEventListener('mousedown', this.mDown);
    this.canvas.addEventListener('mousemove', this.mMove);
    this.canvas.addEventListener('mouseup', this.mUp);

    this.window = window;
    this.window.addEventListener('resize', this.resize);

    this.init();
  }

  calc() {
    const { innerWidth, innerHeight } = this.window;
    if (innerWidth >= 900) {
      this.canvasWidth = innerWidth - 260;
      this.canvasHeight = innerHeight - 50;
    } else if (innerWidth >= 768 && innerWidth < 900) {
      this.canvasWidth = innerWidth;
      this.canvasHeight = innerHeight - 260 - 50;
    } else {
      this.canvasWidth = innerWidth;
      this.canvasHeight = innerHeight - 160 - 50;
    }

    if (
      this.width > this.canvasWidth - this.border * 2 ||
      this.height > this.canvasHeight - this.border * 2
    ) {
      const wRatio = (this.canvasWidth - this.border * 2) / this.width;
      const hRatio = (this.canvasHeight - this.border * 2) / this.height;
      this.scale = wRatio > hRatio ? hRatio : wRatio;
    } else {
      this.scale = 1;
    }
    this.x = (this.canvasWidth - this.width * this.scale) / 2;
    this.y = (this.canvasHeight - this.height * this.scale) / 2;
  }

  drawBackground() {
    this.context.save();
    this.context.translate(0, 0);
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.rect(
      this.x,
      this.y,
      this.width * this.scale,
      this.height * this.scale
    );
    this.context.rect(
      this.canvas.width,
      0,
      -this.canvas.width,
      this.canvas.height
    );
    this.context.fill('evenodd');
    this.context.restore();
  }

  async drawImage() {
    const data = await loadFile(this.image);
    const image = await loadImage(data);
    this.context.save();
    this.context.globalCompositeOperation = 'destination-over';
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.context.rotate((this.image.rotate * Math.PI) / 180);
    this.context.filter = `grayscale(${this.image.grayscale}%)`;

    this.context.drawImage(
      image,
      this.image.crop.x * this.scale - this.canvas.width / 2 + this.x,
      this.image.crop.y * this.scale - this.canvas.height / 2 + this.y,
      this.image.crop.width * this.image.crop.scale * this.scale,
      this.image.crop.height * this.image.crop.scale * this.scale
    );
    this.context.restore();
  }

  draw() {
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawImage();
  }

  init() {
    this.calc();
    this.draw();
  }
}

export default CropSystem;
