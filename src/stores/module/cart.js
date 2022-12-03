import Api from '../../api/Api';

const cart = {
    namespaced: true,

    state: {
        carts: [],
        cartTotal: 0,
        cartWeight: 0
    },

    mutations: {
        SET_CARTS_DATA(state, payload) {
            state.carts = payload
        },
        SET_CART_PRICE(state, payload) {
            state.cartTotal = payload
        },
        SET_CART_WEIGHT(state, payload) {
            state.cartWeight = payload
        },

    },

    actions: {
        storeCart({ dispatch }, { product_id, price, qty, weight }) {
            return new Promise((resolve, reject) => {
                // ambil token dan user
                const token = localStorage.getItem('token')
                const user = JSON.parse(localStorage.getItem('user'))

                //set type Authorization + Bearer token
                Api.defaults.headers.common['Authorization'] = "Bearer " + token

                Api.post('cart', {
                    product_id: product_id,
                    price: price,
                    qty: qty,
                    weight: weight,
                    customer_id: user.id
                }).then(() => {
                    ///  == cara Pertama tanpa dispatch === //

                    // Api.get('/cart')
                    //     .then(response => {
                    //         commit('SET_CARTS_DATA', response.data)
                    //     })
                    // //get total cart
                    // Api.get('/cart/total')
                    //     .then(response => {
                    //         console.log(response.data.total)
                    //         commit('SET_CART_PRICE', response.data.total)
                    //     })

                    dispatch('cartCount')
                    dispatch('cartTotal')

                    resolve()
                }).catch((response) => {
                    console.log('silakan login kembali')
                    reject()
                });
            })
        },
        //cart count
        cartCount({ commit }) {
            //get data token dan user
            const token = localStorage.getItem('token')
            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token
            //get dat cart
            Api.get('/cart')
                .then(response => {
                    //commit mutation GET_CART
                    commit('SET_CARTS_DATA', response.data)

                })

        },
        //cart total
        cartTotal({ commit }) {
            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            Api.get('/cart/total')
                .then(response => {
                    commit('SET_CART_PRICE', response.data.total)
                })
        },

        cartWeight({ commit }) {
            //get data token 
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            Api.get('/cart/totalWeight')
                .then(response => {
                    commit('SET_CART_WEIGHT', response.data.total)
                })
        },

        removeCart({ dispatch }, cart_id) {
            return new Promise((resolve, reject) => {
                Api.post('/cart/remove', {
                    cart_id: cart_id
                }).then((response) => {

                    dispatch('cartCount')


                    resolve(response)
                }).catch((err) => {
                    reject(err)
                });
            });
        },

        checkOut({ dispatch }, { data }) {
            return new Promise((resolve, reject) => {
                Api.post('/checkout', {
                    courier: data.courier_type,
                    service: data.courier_service,
                    cost_courier: data.cost_courier,
                    weight: data.weight,
                    name: data.name,
                    phone: data.phone,
                    province_id: data.province_id,
                    city_id: data.city_id,
                    address: data.address,
                    grand_total: data.grand_total
                }).then((response) => {
                    dispatch('removeCart', response.data)
                    resolve()
                }).catch((error) => {
                    reject(error)
                });
            });
        }
    },
    getters: {
        //get cart
        getCart(state) {
            return state.carts
        },
        //count cart
        cartCount(state) {
            return state.carts.length
        },

        //cart total
        cartTotal(state) {
            return state.cartTotal
        },
        cartWeight(state) {
            return state.cartWeight
        }

    }
}

export default cart