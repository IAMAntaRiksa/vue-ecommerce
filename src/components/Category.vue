<template>
    <div class="card border-0 shadow rounded">
        <div class="card-body">
            <h5 class="font-weight-bold"><i class="fa fa-shopping-bag"></i> KATEGORI</h5>
            <hr>
            <ul class="list-group">
                <a href="" v-for="category in categories" :key="category.id"
                    class="list-group-item shadow-sm font-weight-bold text-decoration-none text-dark">
                    <img :src="category.image" style="width:35px"> {{ category.name }}
                </a>

                <router-link :to="{ name: 'categories' }"
                    class="list-group-item text-center active shadow-sm font-weight-bold text-decoration-none">LIHAT
                    KATEGORI LAINNYA <i class="fa fa-long-arrow-alt-right"></i></router-link>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore()

onMounted(() => {
    store.dispatch('category/getcategoryHeader')
})

const categories = computed(() => {
    return store.state.category.categories
})

</script>