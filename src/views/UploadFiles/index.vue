<template>
  <div>
    <close-bar @changeView="changeView" />
    <container>
      <container-title>Envio das Fotos</container-title>
      <list-files>
        <item-file v-for="(item, index) in params.listFiles" v-bind:key="index">
          <progress-bar class="error"></progress-bar>
          <name>{{ filename(item.name) }}</name>
        </item-file>
      </list-files>
    </container>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import CloseBar from '@/components/CloseBar';

import {
  Container,
  ContainerTitle,
  ListFiles,
  ItemFile,
  ProgressBar,
  Name,
} from './styles';

export default {
  name: 'UploadFiles',
  props: ['params'],
  components: {
    CloseBar,
    Container,
    ContainerTitle,
    ListFiles,
    ItemFile,
    ProgressBar,
    Name,
  },
  methods: {
    changeView(view) {
      this.$emit('changeView', view);
    },
    filename(name) {
      return name.length > 33
        ? `${name.substr(0, 25)}...${name.substr(name.length - 8, name.length)}`
        : name;
    },
  },
};
</script>