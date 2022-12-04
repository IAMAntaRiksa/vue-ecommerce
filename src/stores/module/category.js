import Api from '../../api/Api';
const category = {
    namespaced: true,
    state: {
        categories: [],
        product: []
    },

    mutations: {
        SET_CATEGORIES_DATA(state, payload) {
            state.categories = payload
        },
        SET_CATEGORY_DATA(state, payload) {
            state.product = payload
        },
    },

    actions: {
        getcategoryHeader({ commit }) {
            return new Promise((resolve, reject) => {
                Api.get('/v1/categoryHeader')
                    .then((response) => {
                        commit('SET_CATEGORIES_DATA', response.data.categories)
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
                        commit('SET_CATEGORIES_DATA', response.data.data.data)
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
                        commit('SET_CATEGORY_DATA', response.data.data)
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