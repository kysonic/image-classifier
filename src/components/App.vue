<template>
  <h1>Word2Vec</h1>
  <input type="text" v-model="text" @blur="predict" >
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import classifier from '../services/classifier';

export default defineComponent({
  name: 'App',
  data() {
    return {
      text: ''
    }
  },
  methods: {
    async predict() {
      const isName = await classifier.predict(this.text);
      console.log(isName);
    }
  }
})
</script>

<style>
</style>
