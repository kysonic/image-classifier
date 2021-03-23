<template>
  <form>
    <input type="file" @change="predict">
    <div>{{ result }}</div>
  </form>
</template>


<script lang="ts">
import {defineComponent} from 'vue'
import classifier from '../../../../services/classifier';
import * as tf from "@tensorflow/tfjs";

export default defineComponent({
  name: "TrainForm",
  data() {
    return {
      result: ''
    }
  },

  methods: {
    predict(e: Event) {
      const input = e.target;

      const file = input.files[0];

      let img: ImageData = new Image();
      img.onload = () => this.onImageLoaded(img);
      img.src = URL.createObjectURL(file);
    },

    async onImageLoaded(img: ImageData) {
      const data = await classifier.predict(img);
      console.log(data);
      URL.revokeObjectURL(img.src);
    }
  }
})
</script>

<style scoped>

</style>
