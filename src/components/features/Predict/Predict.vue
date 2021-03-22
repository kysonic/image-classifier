<template>
    <h2>Predict</h2>
    <PredictForm />
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import PredictForm from "./components/PredictForm.vue";

    export default defineComponent({
        name: "Predict",
        components: {
          PredictForm
        },
    })
</script>

<style scoped>

</style>
