import Api from '../../api/Api';
const product = {
    namespaced: true,
    state: {
        products: [],
        product: {}
    },

    mutations: {
        SET_PRODUCTS_DATA(state, payload) {
            state.products = payload
        },
        SET_PRODUCT_DATA(state, payload) {
            state.product = payload
        }
    },

    actions: {
        getProducts({ commit }) {
            return new Promise((resolve, reject) => {
                Api.get(`v1/products`).then((response) => {
                    commit('SET_PRODUCTS_DATA', response.data.data.data)
                    resolve()
                }).catch((error) => {
                    reject(error)
                });
            });
        },

        getDetailProduct({ commit }, slug) {
            return new Promise((resolve, reject) => {
                Api.get(`/v1/products/${slug}`).then((response) => {
                    commit('SET_PRODUCT_DATA', response.data.data)
                    resolve()
                }).catch((error) => {
                    reject(error)
                });
            });
        }
    },

}
export default product