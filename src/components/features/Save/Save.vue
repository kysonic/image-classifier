<template>
  <Loading v-if="isLoading" />
  <button v-else @click="save">Save</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {watch} from '../../../services/watch'
import classifier from "../../../services/classifier";
import Loading from "../../ui/Loading.vue";

export default defineComponent({
    name: "Save",
    components: {
      Loading
    },
    data() {
      return {
        isLoading: true,
      }
    },
    methods: {
      save() {
        classifier.save();
      },
    },
    created() {
      watch(classifier, 'examples', (value: any) => {
        this.isLoading = !value > 0;
      });
    }
})
</script>

<style scoped>

</style>
