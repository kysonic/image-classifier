<template>
    <h2>Predict</h2>
    <Loading v-if="isLoading" />
    <PredictForm v-else />
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import Loading from "../../ui/Loading.vue";
    import PredictForm from "./components/PredictForm.vue";
    import {watch} from "../../../services/watch";
    import classifier from "../../../services/classifier";

    export default defineComponent({
        name: "Predict",
        components: {
          Loading,
          PredictForm
        },
        data() {
          return {
            isLoading: true,
          }
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
