<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div class="col-md-3 mb-4">
                <CustomerMenu />
            </div>
            <div class="col-md-9 mb-4">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h5 class="font-weight-bold"> <i class="fas fa-tachometer-alt"></i> DASHBOARD</h5>
                        <hr>
                        Selamat Datang <strong> {{ user.name }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import CustomerMenu from '../../components/CustomerMenu.vue'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'


//store vuex
const store = useStore()
//mounted
onMounted(() => {
    //panggil action "getUser" dari module "auth" vuex
    store.dispatch('auth/getUser')
})
//computed
const user = computed(() => {
    //panggil getters dengan nama "currentUser" dari module "auth"
    return store.getters['auth/currentUser']
})

</script>