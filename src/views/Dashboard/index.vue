<template>
  <div>
    <menu-bar
      @changeView="changeView"
      @confirm="confirm"
      @selectAll="selectAll"
      @removeSelected="removeSelected"
      :params="params"
    />
    <preview-container>
      <preview-item
        v-for="(item, index) in params.listFiles"
        :key="index"
        :index="index"
        :item="item"
        :preview="params.preview"
        @select="select"
        @setQuantity="setQuantity"
        @removeItem="removeItem"
        @cropItem="cropItem"
      />
    </preview-container>
  </div>
</template>

<script>
import MenuBar from '@/components/MenuBar';
import PreviewItem from '@/components/PreviewItem';

import notification from '@/utils/Notification';
import PreviewContainer from './styles';
import Swal from 'sweetalert2';

export default {
  name: 'Dashboard',
  components: {
    MenuBar,
    PreviewContainer,
    PreviewItem,
  },
  props: ['params'],
  methods: {
    changeView(view) {
      this.$emit('changeView', view);
    },
    select(index) {
      this.params.listFiles[index].selected = !this.params.listFiles[index]
        .selected;
    },
    setQuantity({ qtd, index }) {
      if (this.params.limit > 0 && this.tfotos + qtd > this.params.limit) {
        Swal.fire(
          'Atenção',
          `Você atingiu o limite de ${this.params.limit} fotos!`,
          'warning'
        );
        return;
      }
      this.params.listFiles[index].quantity += qtd;
    },
    removeItem(index) {
      Swal.fire({
        text: 'Deseja realmente excluir essa foto?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1C7CD5',
        confirmButtonText: 'Não',
        cancelButtonText: 'Sim, Remover',
        cancelButtonColor: '#c70000',
      }).then(result => {
        if (!result.value) {
          this.params.listFiles.splice(index, 1);
        }
      });
    },
    cropItem(index) {
      this.params.cropIndex = index;
      this.$emit('changeView', 'cropFiles');
    },
    confirm() {
      if (this.params.limit > 0 && this.tfotos < this.params.limit) {
        return Swal.fire({
          title: 'Atenção',
          text: this.messagefotos,
          type: 'warning',
        });
      }
      this.changeView('uploadFiles');
    },
    selectAll() {
      const selectedList = this.params.listFiles.filter(i => i.selected);
      if (selectedList.length === this.params.listFiles.length) {
        this.params.listFiles.forEach(item => {
          item.selected = false;
        });
      } else {
        this.params.listFiles.forEach(item => {
          item.selected = true;
        });
      }
    },
    removeSelected() {
      const selected = this.params.listFiles.filter(i => i.selected);
      if (!selected.length) {
        return Swal.fire(
          'Atenção',
          'É necessário selecionar uma foto!',
          'warning'
        );
      }
      Swal.fire({
        text: 'Deseja realmente excluir essa(s) foto(s)?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1C7CD5',
        confirmButtonText: 'Não',
        cancelButtonText: 'Sim, Remover',
        cancelButtonColor: '#c70000',
      }).then(result => {
        if (!result.value) {
          let validList = this.params.listFiles.filter(i => !i.selected);
          this.params.listFiles = validList;
        }
      });
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
    messagefotos() {
      let qtd = this.params.limit - this.tfotos;
      if (qtd === this.params.limit) {
        return `Você precisa selecionar as fotos para confirmar.`;
      }
      if (qtd === 1) {
        return 'Você precisa selecionar mais 1 foto para confirmar.';
      }
      return `Você precisa selecionar mais ${qtd} fotos para confirmar.`;
    },
  },
  mounted() {
    notification('dashboard', this.params);
  },
};
</script>