<template>
  <item-container :class="{'selected': item.selected}">
    <item-image @click="select" :width="preview.width + 'px'" :height="preview.height + 'px'">
      <img v-if="item.crop.image !== 'error'" :src="item.crop.image" alt="item.name" />
      <span v-else>
        <i class="fa fa-ban"></i>
        Imagem com Erro!
      </span>
    </item-image>
    <item-tools :width="preview.width + 'px'">
      <text-tools :class="{'active': textActive }">
        <textarea v-model="item.description" placeholder="Insira seu texto Aqui!"></textarea>
      </text-tools>
      <div class="quantity">
        <span class="title">Quantidade</span>
        <button @click="setQuantity(+1)" class="btn-plus">
          <i class="fa fa-plus"></i>
        </button>
        <span class="quantity-display">{{ item.quantity }}</span>
        <button @click="setQuantity(-1)" class="btn-minus">
          <i class="fa fa-minus"></i>
        </button>
      </div>
      <div class="edit">
        <span class="title">Texto</span>
        <button @click="toggleText" class="btn-edit">
          <i class="fa fa-edit"></i>
        </button>
      </div>
      <div class="crop">
        <span class="title">Editar</span>
        <button @click="cropItem" class="btn-crop">
          <i class="fa fa-crop"></i>
        </button>
      </div>
      <div class="trash">
        <span class="title">Excluir</span>
        <button @click="remove" class="btn-trash">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </item-tools>
  </item-container>
</template>
<script>
import { ItemContainer, ItemImage, ItemTools, TextTools } from './styles';

export default {
  name: 'PreviewItem',
  props: ['index', 'item', 'preview'],
  components: {
    ItemContainer,
    ItemImage,
    ItemTools,
    TextTools,
  },
  data() {
    return {
      textActive: false,
    };
  },
  methods: {
    select() {
      this.$emit('select', this.index);
    },
    setQuantity(qtd) {
      if (this.item.quantity + qtd < 1) {
        return;
      }
      this.$emit('setQuantity', {
        qtd,
        index: this.index,
      });
    },
    remove() {
      this.$emit('removeItem', this.index);
    },
    toggleText() {
      this.textActive = !this.textActive;
    },
    cropItem() {
      this.$emit('cropItem', this.index);
    }
  },
};
</script>