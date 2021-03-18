<template>
    <div class="train">
        <h2>Train classifier</h2>
        <Loading v-if="isLoading" />
        <TrainForm v-else />
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue'
    import Loading from '../../ui/Loading.vue'
    import TrainForm from './components/TrainForm.vue';
    import classifier from '../../../services/classifier';
    import { watch } from '../../../services/watch';

    export default defineComponent({
        name: "Train",
        components: {
            Loading,
            TrainForm
        },
        data() {
          return {
            isLoading: false
          }
        },
        created() {
          watch(classifier, 'isLoading', (value: any) => {
            this.isLoading = value;
          });
        }
    })
</script>

<style scoped>

</style>
