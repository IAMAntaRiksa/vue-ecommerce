<template>
    <div class="container-fluid mb-5 mt-4" v-if="(carts.length > 0)">
        <div class="row">
            <div class="col-md-6">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <h5><i class="fa fa-shopping-cart"></i> DETAIL PESENAN</h5>
                        <hr>
                        <table class="table"
                            style="border-style: solid !important;border-color: rgb(198, 206, 214) !important;">
                            <tbody>
                                <tr v-for="cart in carts" :key="cart.id" style="background: #edf2f7;">
                                    <td class="b-none" width="25%">
                                        <div class="wrapper-image-cart">
                                            <img :src="cart.product.image" style="width: 100%;border-radius: .5rem">
                                        </div>
                                    </td>
                                    <td class="b-none" width="50%">
                                        <h5><b>{{ cart.product.title }}</b></h5>
                                        <table class="table-borderless" style="font-size: 14px">
                                            <tr>
                                                <td style="padding: .20rem">QTY</td>
                                                <td style="padding: .20rem">:</td>
                                                <td style="padding: .20rem"><b>{{ cart.qty }}</b></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td class="b-none text-right">
                                        <p class="m-0 font-weight-bold">Rp. {{ moneyFormat(cart.price) }}
                                        </p>
                                        <p class="m-0">
                                            <s style="text-decoration-color:red">Rp.

                                                {{ moneyFormat(cart.product.price * cart.qty) }}

                                            </s>
                                        </p>
                                        <br>
                                        <div class="text-right">
                                            <button @click="removeCart(cart)" class="btn btn-sm btn-danger">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table table-default">
                            <tbody>
                                <tr>
                                    <td class="set-td text-left" width="60%">
                                        <p class="m-0">JUMLAH </p>
                                    </td>
                                    <td class="set-td text-right" width="30%">&nbsp; : Rp.</td>
                                    <td class="text-right set-td ">
                                        <p class="m-0" id="subtotal"> {{ moneyFormat(cartTotal) }}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="set-td text-left  border-0">
                                        <p class="m-0">ONGKOS KIRIM
                                            (<strong>{{ cartWeight }}</strong> gram)</p>
                                    </td>
                                    <td class="set-td border-0 text-right">&nbsp; : Rp.</td>
                                    <td class="set-td border-0 text- right">
                                        <p class="m-0" id="ongkir-cart " align="right">
                                            {{ moneyFormat(state.cost_courier) }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class=" text-left border-0">
                                        <p class="font-weight-bold m-0  h5 text-uppercase">Grand Total </p>
                                    </td>
                                    <td class=" border-0 text-right">&nbsp; : Rp.</td>
                                    <td class=" border-0 text-right">
                                        <p class="font-weight-bold m-0  h5" align="right"> {{
                                                moneyFormat(state.grand_total)
                                        }} </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card border-0 shadow rounded">

                    <!-- start ongkos kirim -->

                    <div class="card-body">
                        <h5><i class="fa fa-user-circle"></i> RINCIAN PENGIRIMAN</h5>
                        <hr>

                        <div class="row">

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">NAMA LENGKAP</label>
                                    <input type="text" class="form-control" id="nama_lengkap" placeholder="Nama Lengkap"
                                        v-model="state.name">
                                    <div v-if="validation.name" class="mt-2 alert alert-danger">
                                        Masukkan Nama Lengkap
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">NO. HP / WHATSAPP</label>
                                    <input type="number" class="form-control" id="phone" placeholder="No. HP / WhatsApp"
                                        v-model="state.phone">
                                    <div v-if="validation.phone" class="mt-2 alert alert-danger">
                                        Masukkan No. Telp
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">PROVINSI</label>
                                    <select class="form-control" v-model="state.province_id"
                                        @change="getCities(state.province_id)">
                                        <option value="">-- pilih provinsi --</option>
                                        <option v-for="province in provinces" :key="province.id"
                                            :value="province.province_id">
                                            {{ province.name }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">KOTA / KABUPATEN</label>
                                    <select class="form-control" v-model="state.city_id" @change="getCourier">
                                        <option value="">-- pilih kota --</option>
                                        <option v-for="city in cities" :key="city.id" :value="city.city_id">
                                            {{ city.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group" v-if="state.courier">
                                    <label class="font-weight-bold">KURIR PENGIRIMAN</label>
                                    <br>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input select-courier" type="radio" name="courier"
                                            id="ongkos_kirim-jne" value="jne" v-model="state.courier_type"
                                            @change="getOngkir">
                                        <label class="form-check-label font-weight-bold mr-4" for="ongkos_kirim-jne">
                                            JNE</label>
                                        <input class="form-check-input select-courier" type="radio" name="courier"
                                            id="ongkos_kirim-tiki" value="tiki" v-model="state.courier_type"
                                            @change="getOngkir">
                                        <label class="form-check-label font-weight-bold mr-4"
                                            for="ongkos_kirim-jnt">TIKI</label>
                                        <input class="form-check-input select-courier" type="radio" name="courier"
                                            id="ongkos_kirim-pos" value="pos" v-model="state.courier_type"
                                            @change="getOngkir">
                                        <label class="form-check-label font-weight-bold"
                                            for="ongkos_kirim-jnt">POS</label>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group" v-if="state.cost">
                                    <hr>
                                    <label class="font-weight-bold">SERVICE KURIR</label>
                                    <br>
                                    <div v-for="value in state.costs" :key="value.service"
                                        class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="cost" :id="value.service"
                                            :value="value.cost[0].value + '|' + value.service"
                                            v-model="state.costService" @change="getCostService">
                                        <label class="form-check-label font-weight-normal mr-5" :for="value.service">
                                            {{ value.service }} - Rp. {{ moneyFormat(value.cost[0].value) }}</label>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">ALAMAT LENGKAP</label>
                                    <textarea class="form-control" id="alamat" rows="3"
                                        placeholder="Alamat Lengkap&#10;&#10;Contoh: Perum. Griya Palem Indah, B-17 Jombang Jawa Timur 61419"
                                        v-model="state.address"></textarea>
                                    <div v-if="validation.address" class="mt-2 alert alert-danger">
                                        Masukkan Alamat Lengkap
                                    </div>
                                </div>
                            </div>

                            <div v-if="state.buttonCheckout" class="col-md-12">
                                <button @click.prevent="checkOut"
                                    class="btn btn-primary btn-lg btn-block">CHECKOUT</button>
                            </div>

                        </div>

                    </div>

                    <!-- end ongkos kirim -->

                </div>
            </div>
        </div>
    </div>

    <div class="row justify-content-center" v-else>
        <!-- data carts tidak tersedia -->
        <div class="col-md-10">
            <br>
            <div class="card border-0 rounded border-top-orange shadow-sm">
                <div class="card-body">
                    <div class="col-sm-12 empty-cart-cls text-center">
                        <img src="@/assets/payment/preview.jpg" width="300" height="550" class="img-fluid mb-4 mr-3">
                        <h3><strong>Keranjang Belanja Kosong :)</strong></h3>
                        <router-link :to="{ name: 'home' }" class="btn btn-primary btn-lg mt-4" data-abc="true">
                            LANJUTKAN BELANJA
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
    <br>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Api from '../../api/Api'


const store = useStore()
const router = useRouter()


const state = reactive({
    name: '',     // <-- state name
    phone: '',     // <-- state phone  
    address: '',     // <-- state address  
    province_id: '',     // <-- state ID province
    city_id: '',     // <-- state ID City
    courier: false,  // <-- state pilihan kurir
    courier_type: '',     // <-- state jenis kurir 
    cost: false,  // <-- state cost kurir
    costs: '',     // <-- state costs kurir
    costService: '',     // <-- state get data cost dan service pengiriman
    cost_courier: 0,      // <-- state untuk menyimpan cost kurir
    courier_service: '',     // <- state untuk menyimpan service kurir        
    buttonCheckout: false,  // <-- state button checkout 
    grand_total: 0       // <-- state untuk grand total 
})

const validation = reactive({
    name: false, // <-- validation name
    phone: false, // <-- validation phone
    address: false  // <-- validation address 
})

onMounted(() => {
    // memanggil beberapa actions di module cart
    store.dispatch('cart/cartCount')
    store.dispatch('cart/cartTotal')
    store.dispatch('cart/cartWeight')

    /// memanggil beberapa aaction di module ongkit
    store.dispatch('ongkir/getProvincies')
    store.dispatch('ongkir/getCities')
})

const carts = computed(() => {
    return store.getters['cart/getCart']
})

const cartTotal = computed(() => {
    return store.getters['cart/cartTotal']
})

const cartWeight = computed(() => {
    return store.getters['cart/cartWeight']

})

const provinces = computed(() => {
    return store.state.ongkir.provincies
})
const cities = computed(() => {
    return store.state.ongkir.cities
})

// function remove cart
function removeCart(cart_id) {
    store.dispatch('cart/removeCart', cart_id)
}

function getCities(province_id) {
    store.dispatch('ongkir/getCities', {
        params: {
            province_id: province_id
        }
    })
}
//fungsi menampilkan pilihan courier
function getCourier() {
    state.courier = true
}

//fungsi untuk mendapatkan biaya ongkos kirim
function getOngkir() {
    //check berat produk
    if (cartWeight.value == 0) {
        alert('silahkan pilih produk terlebih dahulu!')
        return
    }
    Api.post('/rajaongkir/checkOngkir', {
        destination: state.city_id,    // <-- ID kota
        weight: cartWeight.value,           // <-- berat produk
        courier: state.courier_type         // <-- jenis kurir
    }).then(response => {
        // set state cost menjadi true, untuk menampilkan pilihan cost pengiriman
        state.cost = true

        state.costs = response.data.costs
    }).catch(error => {
        console.log(error)
    })

}
function getCostService() {

    let shipping = state.costService.split("|")

    //set state cost dan service
    state.cost_courier = shipping[0]
    state.courier_service = shipping[1]

    //hitung grandrotal
    const token = store.state.auth.token

    Api.defaults.headers.common['Authorization'] = "Bearer " + token
    Api.get('/cart/total')
        .then(response => {
            //jumlahkan total cart dan cost pengiriman
            state.grand_total = parseInt(response.data.total) + parseInt(state.cost_courier)
        })
    //show button checkout
    state.buttonCheckout = true
}


async function checkOut() {

    if (state.name && state.phone && state.address && cartWeight.value) {
        let formData = new FormData();

        formData.append('courier', state.courier_type)
        formData.append('service', state.courier_service)
        formData.append('cost_courier', state.cost_courier)
        formData.append('weight', cartWeight.value)
        formData.append('name', state.name)
        formData.append('phone', state.phone)
        formData.append('city_id', state.city_id)
        formData.append('province_id', state.province_id)
        formData.append('address', state.address)
        formData.append('grand_total', state.grand_total)

        await store.dispatch('checkout/storeCheckout', formData).then((response) => {
            router.push({
                name: 'detail_order',
                params: {
                    snap_token: response.snap_token
                }
            })
        })

    }

    // check validasi name
    if (!state.name) {
        validation.name = true
    }
    //check validasi phone
    if (!state.phone) {
        validation.phone = true
    }
    //check validasi address
    if (!state.address) {
        validation.address = true
    }
}
</script>
