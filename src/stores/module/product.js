import Api from '../../api/Api';
const product = {
    namespaced: true,
    state: {
        products: [],
        product: {}
    },

    mutations: {
        GET_PRODUCTS(state, payload) {
            state.products = payload
        },
        GET_DETAILPRODUCT(state, payload) {
            state.product = payload
        }
    },

    actions: {
        getProducts({ commit }) {
            return new Promise((resolve, reject) => {
                Api.get(`v1/products`).then((response) => {
                    commit('GET_PRODUCTS', response.data.data.data)
                    resolve()
                }).catch((error) => {
                    reject(error)
                });
            });
        },

        getDetailProduct({ commit }, slug) {
            return new Promise((resolve, reject) => {
                Api.get(`/v1/products/${slug}`).then((response) => {
                    commit('GET_DETAILPRODUCT', response.data.data)
                    resolve()
                }).catch((error) => {
                    reject(error)
                });
            });
        }
    },

}
export default product