<template>
  <crop-container>
    <crop-info>AJUSTE SUA FOTO E CLIQUE EM CONFIRMAR</crop-info>
    <crop-buttons>
      <crop-buttons-position>
        <span>POSIÇÃO</span>
        <button
          v-on:touchstart.prevent="touchDown('TOP_LEFT')"
          v-on:touchend.prevent="touchUp"
          @mousedown="btDown('TOP_LEFT')"
        >
          <i class="fa fa-arrow-left rotate-increase"></i>
        </button>
        <button
          v-on:touchstart.prevent="touchDown('TOP')"
          v-on:touchend.prevent="touchUp"
          @mousedown="btDown('TOP')"
        >
          <i class="fa fa-arrow-up"></i>
        </button>
        <button
          v-on:touchstart.prevent="touchDown('TOP_RIGHT')"
          v-on:touchend.prevent="touchUp"
          @mousedown="btDown('TOP_RIGHT')"
        >
          <i class="fa fa-arrow-right rotate-decrease"></i>
        </button>
        <button
          v-on:touchstart.prevent="touchDown('LEFT')"
          v-on:touchend.prevent="touchUp"
          @mousedown="btDown('LEFT')"
        >
          <i class="fa fa-arrow-left"></i>
        </button>
        <button v-on:touchstart.prevent="moveCenter" @click="moveCenter">
          <i class="fa fa-stop-circle"></i>
        </button>
        <button
          v-on:touchstart.prevent="touchDown('RIGHT')"
          v-on:touchend.prevent="touchUp"
          @mousedown="btDown('RIGHT')"
        >
          <i class="fa fa-arrow-right"></i>
        </button>
        <button
          v-on:touchstart.prevent="touchDown('BOTTOM_LEFT')"
          v-on:touchend.prevent="touchUp"
          @mousedown="btDown('BOTTOM_LEFT')"
        >
          <i class="fa fa-arrow-left rotate-decrease"></i>
        </button>
        <button
          v-on:touchstart.prevent="touchDown('BOTTOM')"
          v-on:touchend.prevent="touchUp"
          @mousedown="btDown('BOTTOM')"
        >
          <i class="fa fa-arrow-down"></i>
        </button>
        <button
          v-on:touchstart.prevent="touchDown('BOTTOM_RIGHT')"
          v-on:touchend.prevent="touchUp"
          @mousedown="btDown('BOTTOM_RIGHT')"
        >
          <i class="fa fa-arrow-right rotate-increase"></i>
        </button>
      </crop-buttons-position>
      <crop-buttons-zoom>
        <span>ZOOM</span>
        <button
          v-on:touchstart.prevent="touchDown('ZOOM_IN')"
          v-on:touchend.prevent="touchUp"
          @mousedown="btDown('ZOOM_IN')"
        >
          <i class="fa fa-plus"></i>
        </button>
        <button v-on:touchstart.prevent="expand" @click="expand">
          <i class="fa fa-expand"></i>
        </button>
        <button
          v-on:touchstart.prevent="touchDown('ZOOM_OUT')"
          v-on:touchend.prevent="touchUp"
          @mousedown="btDown('ZOOM_OUT')"
        >
          <i class="fa fa-minus"></i>
        </button>
      </crop-buttons-zoom>
      <crop-buttons-rotation>
        <span>ROT.</span>
        <button v-on:touchstart.prevent="rotate('LEFT')" @click="rotate('LEFT')">
          <i class="fa fa-undo"></i>
        </button>
        <button v-on:touchstart.prevent="rotate('RIGHT')" @click="rotate('RIGHT')">
          <i class="fa fa-undo flip"></i>
        </button>
      </crop-buttons-rotation>
      <crop-slide-pb>
        <span>COLORIDO / PRETO E BRANCO</span>
        <input
          type="range"
          v-model="image.grayscale"
          @change="() => this.$emit('draw')"
          @mousemove="() => this.$emit('draw')"
          min="0"
          max="100"
          step="1"
        />
      </crop-slide-pb>
    </crop-buttons>
    <crop-events>
      <button @click="close" class="cancel">
        <i class="fa fa-times-circle"></i>CANCELAR
      </button>
      <button @click="confirm" class="confirm">
        <i class="fa fa-check-circle"></i>CONFIRMAR
      </button>
    </crop-events>
  </crop-container>
</template>

<script>
import {
  CropContainer,
  CropInfo,
  CropButtons,
  CropButtonsPosition,
  CropButtonsZoom,
  CropButtonsRotation,
  CropSlidePb,
  CropEvents,
} from './styles';

export default {
  name: 'CropTools',
  props: ['image', 'crop'],
  data() {
    return {
      bt_type: null,
      interval: null,
    };
  },
  components: {
    CropContainer,
    CropInfo,
    CropButtons,
    CropButtonsPosition,
    CropButtonsZoom,
    CropButtonsRotation,
    CropSlidePb,
    CropEvents,
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    close() {
      this.$emit('changeView', 'dashboard');
    },
    moveCenter() {
      this.image.x = (this.crop.width * this.crop.scale - this.image.width) / 2;
      this.image.y =
        (this.crop.height * this.crop.scale - this.image.height) / 2;
      this.$emit('draw');
    },
    tap(type) {
      this.bt_type = type;
      this.btHandle();
    },
    touchDown(type) {
      this.bt_type = type;
      this.interval = window.setInterval(this.btHandle, 25);
    },
    touchUp(type) {
      window.clearInterval(this.interval);
    },
    btDown(type) {
      this.bt_type = type;
      this.interval = window.setInterval(this.btHandle, 25);
      window.addEventListener('mouseup', this.btUp);
    },
    btHandle() {
      switch (this.bt_type) {
        case 'ZOOM_IN':
          this.image.scale += 0.002;
          this.image.x -=
            (this.image.resource.width * this.image.scale - this.image.width) /
            2;
          this.image.y -=
            (this.image.resource.height * this.image.scale -
              this.image.height) /
            2;
          this.image.width = this.image.resource.width * this.image.scale;
          this.image.height = this.image.resource.height * this.image.scale;
          break;
        case 'ZOOM_OUT':
          this.image.scale -= 0.002;
          this.image.x -=
            (this.image.resource.width * this.image.scale - this.image.width) /
            2;
          this.image.y -=
            (this.image.resource.height * this.image.scale -
              this.image.height) /
            2;
          this.image.width = this.image.resource.width * this.image.scale;
          this.image.height = this.image.resource.height * this.image.scale;
          break;
        case 'TOP_LEFT':
          switch (this.image.rotate) {
            case 90:
              this.image.x -= 1;
              this.image.y += 1;
              break;
            case 180:
              this.image.x += 1;
              this.image.y += 1;
              break;
            case 270:
              this.image.x += 1;
              this.image.y -= 1;
              break;
            default:
              this.image.x -= 1;
              this.image.y -= 1;
          }
          break;
        case 'TOP':
          switch (this.image.rotate) {
            case 90:
              this.image.x -= 1;
              break;
            case 180:
              this.image.y += 1;
              break;
            case 270:
              this.image.x += 1;
              break;
            default:
              this.image.y -= 1;
          }
          break;
        case 'TOP_RIGHT':
          switch (this.image.rotate) {
            case 90:
              this.image.x -= 1;
              this.image.y -= 1;
              break;
            case 180:
              this.image.x -= 1;
              this.image.y += 1;
              break;
            case 270:
              this.image.x += 1;
              this.image.y += 1;
              break;
            default:
              this.image.x += 1;
              this.image.y -= 1;
          }
          break;
        case 'LEFT':
          switch (this.image.rotate) {
            case 90:
              this.image.y += 1;
              break;
            case 180:
              this.image.x += 1;
              break;
            case 270:
              this.image.y -= 1;
              break;
            default:
              this.image.x -= 1;
          }
          break;
        case 'RIGHT':
          switch (this.image.rotate) {
            case 90:
              this.image.y -= 1;
              break;
            case 180:
              this.image.x -= 1;
              break;
            case 270:
              this.image.y += 1;
              break;
            default:
              this.image.x += 1;
          }
          break;
        case 'BOTTOM_LEFT':
          switch (this.image.rotate) {
            case 90:
              this.image.x += 1;
              this.image.y += 1;
              break;
            case 180:
              this.image.x += 1;
              this.image.y -= 1;
              break;
            case 270:
              this.image.x -= 1;
              this.image.y -= 1;
              break;
            default:
              this.image.x -= 1;
              this.image.y += 1;
          }
          break;
        case 'BOTTOM':
          switch (this.image.rotate) {
            case 90:
              this.image.x += 1;
              break;
            case 180:
              this.image.y -= 1;
              break;
            case 270:
              this.image.x -= 1;
              break;
            default:
              this.image.y += 1;
          }
          break;
        case 'BOTTOM_RIGHT':
          switch (this.image.rotate) {
            case 90:
              this.image.x += 1;
              this.image.y -= 1;
              break;
            case 180:
              this.image.x -= 1;
              this.image.y -= 1;
              break;
            case 270:
              this.image.x -= 1;
              this.image.y += 1;
              break;
            default:
              this.image.x += 1;
              this.image.y += 1;
          }
          break;
      }
      this.$emit('draw');
    },
    btUp() {
      window.clearInterval(this.interval);
      window.removeEventListener('mouseup', this.btUp);
    },
    expand() {
      let wRatio, hRatio, cropped, borderer, full;
      if (this.image.rotate == 90 || this.image.rotate == 270) {
        wRatio =
          (this.crop.width * this.crop.scale) / this.image.resource.height;
        hRatio =
          (this.crop.height * this.crop.scale) / this.image.resource.width;
      } else {
        wRatio =
          (this.crop.width * this.crop.scale) / this.image.resource.width;
        hRatio =
          (this.crop.height * this.crop.scale) / this.image.resource.height;
      }
      cropped = wRatio > hRatio ? wRatio : hRatio;
      borderer = wRatio > hRatio ? hRatio : wRatio;
      full = this.crop.scale;
      if (this.image.scale == borderer) {
        this.image.scale = cropped;
      } else if (this.image.scale == cropped) {
        this.image.scale = full;
      } else {
        this.image.scale = borderer;
      }
      this.image.width = this.image.resource.width * this.image.scale;
      this.image.height = this.image.resource.height * this.image.scale;
      this.image.x = (this.crop.width * this.crop.scale - this.image.width) / 2;
      this.image.y =
        (this.crop.height * this.crop.scale - this.image.height) / 2;
      this.$emit('draw');
    },
    rotate(type) {
      if (type == 'RIGHT') {
        this.image.rotate += 90;
      } else {
        this.image.rotate -= 90;
      }
      if (this.image.rotate == 360) this.image.rotate = 0;
      if (this.image.rotate == -90) this.image.rotate = 270;
      this.$emit('draw');
    },
  },
};
</script>