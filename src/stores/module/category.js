import Api from '../../api/Api';
const category = {
    namespaced: true,

    state: {
        categories: []
    },

    mutations: {
        GET_CATEGORIES(state, payload) {
            state.categories = payload
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
                        commit('GET_CATEGORIES', response.data.data.data)
                        resolve()
                    }).catch((err) => {
                        reject(err.response.data)
                    });
            });
        },
    },
    getters: {
        //
    }
}
export default category