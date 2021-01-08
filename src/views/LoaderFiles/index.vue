<template>
  <container>
    <img src="../../assets/images/logo.png">
    <container-title>CARREGANDO FOTOS</container-title>
    <loader>
      <ball />
      <ball />
      <ball />
    </loader>
    <info>{{ info }}</info>
  </container>
</template>

<script>
import { Container, ContainerTitle, Loader, Ball, Info } from './styles';
import render from '@/services/render';

export default {
  name: 'LoaderFiles',
  props: ['params'],
  components: {
    Container,
    ContainerTitle,
    Loader,
    Ball,
    Info,
  },
  data() {
    return {
      sel: 0,
    };
  },
  methods: {
    async start() {
      if (this.params.listFiles[this.sel].crop.image) {
        return this.checkFiles();
      }
      try {
        await render.makePreview({
          width: this.params.width,
          height: this.params.height,
          item: this.params.listFiles[this.sel],
        });
      } catch (err) {
        console.log('item', this.params.listFiles[this.sel].name);
        console.log('error', err);
      } finally {
        this.checkFiles();
      }
    },
    checkFiles() {
      this.sel++;
      if (this.sel < this.params.listFiles.length) {
        return this.start();
      }
      this.$emit('changeView', 'dashboard');
    },
  },
  computed: {
    info() {
      const { listFiles } = this.params;
      const init = this.sel + 1 < 10 ? `0${this.sel + 1}` : this.sel + 1;
      const end =
        listFiles.length < 10 ? `0${listFiles.length}` : listFiles.length;
      const progress = listFiles[this.sel].progress.load;
      return `${init} de ${end} - ${progress}%`;
    },
  },
  mounted() {
    this.sel = 0;
    this.start();
  },
};
</script>