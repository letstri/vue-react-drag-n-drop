<template>
  <PhotoUploader v-model="files" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PhotoUploader from '@/components/PhotoUploader.vue';

export default defineComponent({
  components: {
    PhotoUploader,
  },

  setup() {
    const files = ref<Array<File>>([]);

    return { files };
  },
});
</script>

<style lang="scss">
@import "~@/assets/scss/global.scss";
</style>
