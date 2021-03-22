<template>
  <form>
    <input type="file" @change="predict">
    <div>{{ result }}</div>
  </form>
</template>


<script lang="ts">
import {defineComponent} from 'vue'
import classifier from '../../../../services/classifier';

export default defineComponent({
  name: "TrainForm",
  data() {
    return {
      result: ''
    }
  },

  methods: {
    async predict(e: Event) {
      const data = await classifier.predict(e.target.files[0]);
      console.log(data);
    },
  }
})
</script>

<style scoped>

</style>
