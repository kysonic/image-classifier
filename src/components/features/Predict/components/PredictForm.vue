<template>
    <form>
        <input type="file" @change="predict" >
        <div>{{result}}</div>
    </form>
</template>


<script lang="ts">
    import {defineComponent} from 'vue'
    import * as tf from '@tensorflow/tfjs';
    import classifier from '../../../../services/classifier';

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
              const result = await classifier.predict(tf.browser.fromPixels(img));
              this.result = `${result.label}: ${result.confidences[result.label]}`
              URL.revokeObjectURL(img.src);
            }
        }
    })
</script>

<style scoped>

</style>
