<template>
  <container>
    <revel>
      <img src="../../assets/images/revel.png" />
    </revel>
    <logotipo href="https://amorporfotos.com.br">
      <img src="../../assets/images/logo.png" />
    </logotipo>
    <close-button @click="close">
      <i class="fa fa-times"></i>
    </close-button>
  </container>
</template>
<script>
import { Container, Revel, Logotipo, CloseButton } from './styles';

export default {
  name: 'CloseBar',
  components: {
    Container,
    Revel,
    Logotipo,
    CloseButton,
  },
  methods: {
    close() {
      this.$emit('changeView', 'dashboard');
    },
  },
};
</script>