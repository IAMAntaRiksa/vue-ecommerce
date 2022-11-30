import Api from '../../api/Api';
const product = {
    namespaced: true,
    state: {
        products: []
    },

    mutations: {
        GET_PRODUCTS(state, payload) {
            state.products = payload
        }
    },

    actions: {
        getProducts({ commit }) {
            return new Promise((resolve, reject) => {
                Api.get(`v1/products`).then((response) => {
                    console.log(response.data.data.data)
                    commit('GET_PRODUCTS', response.data.data.data)
                    resolve()
                }).catch((error) => {
                    reject(error)
                });
            });
        }
    },

}
export default product