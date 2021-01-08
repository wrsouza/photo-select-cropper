<template>
  <container>
    <revel>
      <img src="../../assets/images/revel.png" />
    </revel>
    <logotipo href="https://amorporfotos.com.br">
      <img src="../../assets/images/logo.png" />
    </logotipo>
    <nav-menu :class="{'openned': menuOpenned }">
      <menu-button @click="menuToggle" :class="{'openned': menuOpenned }">
        <i v-if="menuOpenned" class="fa fa-times"></i>
        <i v-else class="fa fa-bars"></i>
      </menu-button>
      <div class="container">
        <div class="container-top">
          <button @click="goToSelectFiles" class="btn-blue">ADICIONAR FOTOS</button>
          <button @click="selectAll" class="btn-gray">{{ btSelectName }}</button>
          <button @click="removeSelected" class="btn-red">REMOVER SELECIONADAS</button>
          <div class="box-info">
            <span class="box-info-title">TAMANHO</span>
            <span class="box-info-size">{{ params.size }}</span>
            <span class="box-info-title">PAPEL</span>
            <span class="box-info-paper">{{ params.paper }}</span>
          </div>
        </div>
        <div class="container-bottom">
          <h1 class="resume-title">RESUMO</h1>
          <span class="resume-item">
            <span class="resume-item-title">Total de Fotos:</span>
            <span class="resume-item-fotos">{{ tfotos }}</span>
          </span>
          <span class="resume-item">
            <span class="resume-item-title">Valor por Foto:</span>
            <span class="resume-item-vfotos">{{ vunit }}</span>
          </span>
          <span class="resume-item">
            <span class="resume-item-title">Valor Total:</span>
            <span class="resume-item-vtotal">{{ vtotal }}</span>
          </span>
          <button @click="confirm" class="btn-confirm">CONFIRMAR</button>
          <button class="btn-cancel">CANCELAR</button>
        </div>
      </div>
    </nav-menu>
  </container>
</template>

<script>
import { Container, Revel, Logotipo, MenuButton, NavMenu } from './styles';
import { formatPrice } from '@/utils/format';

export default {
  name: 'MenuBar',
  props: ['params'],
  components: {
    Container,
    Revel,
    Logotipo,
    MenuButton,
    NavMenu,
  },
  data() {
    return {
      menuOpenned: true,
    };
  },
  methods: {
    menuToggle() {
      this.menuOpenned = !this.menuOpenned;
    },
    goToSelectFiles() {
      this.menuOpenned = false;
      this.$emit('changeView', 'selectFiles');
    },
    confirm() {
      this.$emit('confirm');
    },
    selectAll() {
      this.$emit('selectAll');
    },
    removeSelected() {
      this.$emit('removeSelected');
    },
  },
  computed: {
    tfotos() {
      let total = 0;
      this.params.listFiles.forEach(i => {
        total += i.quantity;
      });
      return total;
    },
    vunit() {
      return formatPrice(this.params.price);
    },
    vtotal() {
      return formatPrice(parseInt(this.tfotos) * parseFloat(this.params.price));
    },
    btSelectName() {
      const selectedList = this.params.listFiles.filter(i => i.selected);
      if (
        this.params.listFiles.length &&
        selectedList.length === this.params.listFiles.length
      ) {
        return 'DESELECIONAR TODAS';
      }
      return 'SELECIONAR TODAS';
    },
  },
};
</script>