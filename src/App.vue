<template>
  <div>
    <dashboard @changeView="changeView" :params="params" v-if="views.dashboard" />
    <select-files @changeView="changeView" :params="params" v-if="views.selectFiles" />
    <facebook-albums v-if="views.facebookAlbums" />
    <facebook-files v-if="views.facebookFiles" />
    <loader-files @changeView="changeView" :params="params" v-if="views.loaderFiles" />
    <crop-files @changeView="changeView" :params="params" v-if="views.cropFiles" />
    <upload-files @changeView="changeView" :params="params" v-if="views.uploadFiles" />
  </div>
</template>

<script>
import Dashboard from '@/views/Dashboard';
import SelectFiles from '@/views/SelectFiles';
import FacebookAlbums from '@/views/FacebookAlbums';
import FacebookFiles from '@/views/FacebookFiles';
import LoaderFiles from '@/views/LoaderFiles';
import CropFiles from '@/views/CropFiles';
import UploadFiles from '@/views/UploadFiles';

export default {
  name: 'App',
  components: {
    Dashboard,
    SelectFiles,
    FacebookAlbums,
    FacebookFiles,
    LoaderFiles,
    CropFiles,
    UploadFiles,
  },
  data() {
    return {
      views: {
        dashboard: false,
        selectFiles: false,
        facebookAlbums: false,
        facebookFiles: false,
        loaderFiles: false,
        cropFiles: false,
        uploadFiles: false,
      },
      params: {
        listFiles: [],
        size: '',
        paper: '',
        width: 0,
        height: 0,
        limit: 0,
        price: 0,
        preview: {
          width: 0,
          height: 0,
          scale: 1,
        },
        notification: {
          selectFiles: true,
          facebookAlbums: true,
          facebookFiles: true,
          dashboard: true,
          cropFiles: true,
        },
        cropIndex: null,
      },
    };
  },
  methods: {
    changeView(view) {
      this.closeAllViews();
      this.views[view] = true;
    },
    closeAllViews() {
      this.views.dashboard = false;
      this.views.selectFiles = false;
      this.views.facebookAlbums = false;
      this.views.facebookFiles = false;
      this.views.loaderFiles = false;
      this.views.cropFiles = false;
      this.views.uploadFiles = false;
    },
    calcPreview() {
      const { preview, width, height } = this.params;
      preview.scale = width > height ? 280 / width : 280 / height;
      preview.width = width * preview.scale;
      preview.height = height * preview.scale;
    },
    getData() {
      this.params.size = 'POLAROID 30 FOTOS';
      this.params.paper = 'FOTOGRÁFICO BRILHANTE';
      this.params.width = 3000;
      this.params.height = 3000;
      this.params.price = 0.58;
      this.params.limit = 30;
      this.calcPreview();
      this.changeView('selectFiles');
    },
  },
  mounted() {
    this.getData();
  },
};
</script>