<template>
    <div id="carousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item" v-for="(slider, id) in sliders" :class="{ active: id == 0 }" :key='slider.id'>
                <img :src="slider.image" class="d-block w-100 rounded-lg">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

// difine store 
const store = useStore()

onMounted(() => {
    store.dispatch('slider/getSliders')
})


const sliders = computed(() => {
    return store.state.slider.sliders
})
</script>