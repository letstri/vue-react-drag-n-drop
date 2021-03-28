<template>
  <PhotoUploader v-model="test" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PhotoUploader from '@/components/PhotoUploader.vue';

export default defineComponent({
  components: {
    PhotoUploader,
  },

  setup() {
    const test = ref([]);

    return { test };
  },
});
</script>
