import Api from '../../api/Api';
const category = {
    namespaced: true,
    state: {
        categories: [],
        product: []
    },

    mutations: {
        GET_CATEGORIES(state, payload) {
            state.categories = payload
        },
        GET_DETAILCATEGORY(state, payload) {
            state.product = payload
        },
    },

    actions: {
        getcategoryHeader({ commit }) {
            return new Promise((resolve, reject) => {
                Api.get('/v1/categoryHeader')
                    .then((response) => {
                        commit('GET_CATEGORIES', response.data.categories)
                        resolve()
                    }).catch((err) => {
                        reject(err.response.data)
                    });
            });
        },

        getAllCategories({ commit }) {
            return new Promise((resolve, reject) => {
                Api.get('/v1/categories')
                    .then((response) => {
                        commit('GET_CATEGORIES', response.data.data.data)
                        resolve()
                    }).catch((err) => {
                        reject(err.response.data)
                    });
            });
        },
        getDeteailCategories({ commit }, slug) {
            return new Promise((resolve, reject) => {
                Api.get(`/v1/categories/${slug}`)
                    .then((response) => {
                        commit('GET_DETAILCATEGORY', response.data.data)
                        resolve()
                    }).catch((err) => {
                        reject(err.response.data)
                    });
            });
        },
    },
    // getters: {
    //     gettProduct(state) {
    //         return state.product
    //     }
    // }
}
export default category