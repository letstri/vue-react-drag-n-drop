<template>
  <div class="photo-uploader">
    <div
      class="photo-uploader__wrapper"
      :class="{ 'photo-uploader__wrapper--drag': isDragStarted }"
    >
      <input
        ref="input"
        class="photo-uploader__input"
        type="file"
        multiple
        title=""
        @change="uploadFile"
        @dragenter="isDragStarted = true"
        @dragleave="isDragStarted = false"
      >
      {{ isDragStarted ? '' : uploadText }}
      <img
        v-show="isDragStarted"
        src="@/assets/images/upload.svg"
        class="photo-uploader__icon"
        alt="Загрузите фото"
      >
    </div>
    <div class="photo-uploader__photos">
      <div
        v-for="(photo, index) in modelValue"
        :key="index"
        class="photo-uploader__photo"
      >
        <button
          class="photo-uploader__remove"
          @click="removePhoto(index)"
        />
        <img
          :src="getSrc(photo)"
          :alt="`Фотография ${index + 1}`"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  PropType,
  toRefs,
} from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<Array<File>>,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const { modelValue } = toRefs(props);

    const input = ref<HTMLInputElement | null>(null);
    const isDragStarted = ref(false);

    const uploadFile = ({ currentTarget }: Event & { currentTarget: HTMLInputElement }) => {
      if (currentTarget.files) {
        emit('update:modelValue', [...modelValue.value, ...Array.from(currentTarget.files)]);
      }

      if (input.value) {
        input.value.value = '';
      }

      isDragStarted.value = false;
    };

    const removePhoto = (index: number) => {
      emit('update:modelValue', modelValue.value.filter((p, i) => i !== index));
    };

    const getSrc = (photo: File) => URL.createObjectURL(photo);

    const needToUpload = computed(() => 3 - modelValue.value.length);

    const uploadText = computed(() => {
      if (needToUpload.value > 0) {
        return `Загрузите ${needToUpload.value} ${needToUpload.value === 1 ? 'вашу фотографию' : 'ваши фотографии'}`;
      }

      if (needToUpload.value === 0) {
        return 'Вы загрузили все фотографии';
      }

      return 'Вы загрузили слишком много фотографий';
    });

    return {
      isDragStarted,
      uploadText,
      input,
      uploadFile,
      removePhoto,
      needToUpload,
      getSrc,
    };
  },
});
</script>

<style lang="scss">
.photo-uploader {
  &__wrapper {
    position: relative;
    text-align: center;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 4px dotted #eee;
    border-radius: 10px;
    color: rgba(#000, 0.5);

    &--drag {
      color: rgba(#fff, 0);
      border-color: #777;
    }
  }

  &__input {
    cursor: pointer;
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 0;
  }

  &__photos {
    display: flex;
    margin-top: 20px;
  }

  &__photo {
    position: relative;
    width: 200px;
    margin-right: 60px;

    img {
      border-radius: 10px;
    }
  }

  &__remove {
    cursor: pointer;
    position: absolute;
    outline: none;
    top: 0;
    left: calc(100% + 10px);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(#000, 0.05);
    border: 0;

    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      top: calc(50% - 1px);
      left: calc(50% - 5px);
      width: 10px;
      height: 2px;
      background-color: #000;
    }
  }

  &__icon {
    opacity: 0.3;
    width: 50px;
  }
}
</style>
