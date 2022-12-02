import Api from '../../api/Api';

const cart = {
    namespaced: true,

    state: {
        carts: [],
        cartTotal: 0,
        // cartWeight: 0
    },

    mutations: {
        SET_CARTS_DATA(state, payload) {
            state.carts = payload
        },
        SET_CART_PRICE(state, payload) {
            state.cartTotal = payload
        },
        // SET_CART_WEIGHT(state, payload) {
        //     state.cartWeight = payload
        // },

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

        // cartWeight({ commit }) {
        //     //get data token dan user
        //     const token = localStorage.getItem('token')

        //     //set axios header dengan type Authorization + Bearer token
        //     Api.defaults.headers.common['Authorization'] = "Bearer " + token

        //     Api.get('/cart/totalWeight')
        //         .then(response => {
        //             console.log('wewewe', response.data)
        //             commit('SET_CART_WEIGHT', response.data)
        //         })
        // },
    },
    getters: {
        //count cart
        cartCount(state) {
            return state.carts.length
        },

        //cart total
        cartTotal(state) {
            return state.cartTotal
        }
    }
}

export default cart