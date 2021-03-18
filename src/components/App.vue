<template>
    <h1>Trainer</h1>
    <Train />
    <Predict />
    <Save />
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import Train from './features/Train/Train.vue';
    import Predict from './features/Predict/Predict.vue';
    import Save from './features/Save/Save.vue';

    export default defineComponent({
        name: 'App',
        components: {
            Train,
            Predict,
            Save
        }
    })
</script>

<style>
</style>
