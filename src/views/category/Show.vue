<template>
    <div class="container-fluid mb-5 mt-4" v-if="detailCategory.length">
        <div class="row">
            <div v-for="detail in detailCategory" :key="detail.id" class="col-md-3 col-6 mb-3">
                <div class="card h-100 border-0 shadow rounded-md">
                    <div class="card-img">
                        <img :src="detail.image" class="w-100"
                            style="height: 15em;object-fit:cover;border-top-left-radius: .25rem;border-top-right-radius: .25rem;">
                    </div>
                    <div class="card-body">
                        <a href="#" class="card-title font-weight-bold" style="font-size:20px">
                            {{ detail.title }}
                        </a>
                        <div class="discount mt-2" style="color:#999"><s>Rp. {{ moneyFormat(detail.price) }}</s>
                            <span style="background-color: darkorange"
                                class="badge badge-pill badge-success text-white">DISKON
                                {{ detail.discount }} %</span>
                        </div>
                        <div class="price font-weight-bold mt-3" style="color: #47b04b;font-size:20px">
                            Rp. {{ moneyFormat(calculateDiscount(detail)) }}</div>
                        <a href="#" class="btn btn-primary btn-md mt-3 btn-block shadow-md">LIHAT
                            PRODUK</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div>TIDAK ADA DATA </div>
    </div>

</template>
<script setup>
import { computed, onMounted } from 'vue'
// computed dan onMounted
import { useStore } from 'vuex' // store Vuex
import { useRoute } from 'vue-router' // vue router

//store vuex
const store = useStore()
//vue route
const route = useRoute()
//onMounted akan menjalankan action "getProductInCategory" di module "category" Vuex
onMounted(() => {
    store.dispatch('category/getDeteailCategories',
        route.params.slug)
})
//computed properti digunakan untuk mendapatkan data products dari state "productInCategory" di module "category"
const detailCategory = computed(() => {
    return store.state.category.product
})
</script>