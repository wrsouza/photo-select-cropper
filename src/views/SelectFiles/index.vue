<template>
  <div>
    <close-bar @changeView="changeView" />
    <container>
      <container-title>LOCALIZE SUA FOTO</container-title>
      <local-button @click="getLocalPhoto">
        <i class="fa fa-folder-open"></i>FOTO LOCAL
      </local-button>
      <facebook-button>
        <i class="fab fa-facebook-square"></i>FOTO DO FACEBOOK
      </facebook-button>
    </container>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import CloseBar from '@/components/CloseBar';

import {
  Container,
  ContainerTitle,
  LocalButton,
  FacebookButton,
} from './styles';

import notification from '@/utils/Notification';
import selectFiles from '@/services/select';

export default {
  name: 'SelectFiles',
  props: ['params'],
  components: {
    CloseBar,
    Container,
    ContainerTitle,
    LocalButton,
    FacebookButton,
  },
  methods: {
    changeView(view) {
      this.$emit('changeView', view);
    },
    async getLocalPhoto() {
      const checkLimit = await selectFiles(this.params);
      if (!checkLimit) {
        return this.$emit('changeView', 'loaderFiles');
      }
      Swal.fire(
        'Atenção',
        `Você atingiu o limite de ${this.params.limit} fotos!`,
        'warning'
      ).then(result => {
        this.$emit('changeView', 'loaderFiles');
      });
    },
  },
  mounted() {
    notification('selectFiles', this.params);
  },
};
</script>