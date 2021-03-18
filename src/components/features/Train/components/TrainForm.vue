<template>
    <form>
        <input type="file" multiple @change="train" >
        <input type="text" v-model="label" />
    </form>
</template>


<script lang="ts">
    import {defineComponent} from 'vue'
    import * as tf from '@tensorflow/tfjs';
    import classifier from '../../../../services/classifier';

    const AVAILABLE_TYPES = ['image/png', 'image/jpeg'];

    export default defineComponent({
        name: "TrainForm",
        data() {
          return {
            label: ''
          }
        },

        methods: {
            train(e) {
              const input = e.target;

              Array.from(input.files).forEach((file) => {
                if (AVAILABLE_TYPES.includes(file.type)) {
                  let img = new Image();
                  img.onload = () => this.onImageLoaded(img);
                  img.src = URL.createObjectURL(file);
                }
              });
            },

            onImageLoaded(img) {
              if (!this.label) {
                return alert('Enter the label first');
              }
              classifier.train(tf.browser.fromPixels(img), this.label);
              URL.revokeObjectURL(img.src);
            }
        }
    })
</script>

<style scoped>

</style>
