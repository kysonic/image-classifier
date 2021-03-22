<template>
  <Predict/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Predict from './features/Predict/Predict.vue';

export default defineComponent({
  name: 'App',
  components: {
    Predict
  }
})
</script>

<style>
</style>
