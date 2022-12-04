import Api from '../../api/Api';
const auth = {
    namespaced: true,

    state: {
        token: localStorage.getItem("token") || "",
        user: JSON.parse(localStorage.getItem("user")) || {},
    },

    mutations: {
        AUTH_SUCCESS(state, token, user) {
            state.user = user
            state.token = token
        },
        GET_USER(state, user) {
            state.user = user
        },
        AUTH_LOGOUT(state) {
            state.token = ''
            state.user = {}
        }
    },

    actions: {
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                Api.post(`/register`, {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.password_confirmation
                }).then((response) => {

                    const token = response.data.data.token
                    const user = response.data.data.user

                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))

                    Api.defaults.headers.common['Authorization'] = "Bearer " + token

                    commit('AUTH_SUCCESS', token, user)

                    commit('GET_USER', user)
                    resolve()
                }).catch((error) => {
                    localStorage.removeItem('token')
                    reject(error.response.data.errors)
                });
            });
        },
        getUser({ commit }) {
            const token = localStorage.getItem('token')
            Api.defaults.headers.common['Authorization'] = "Bearer " + token
            Api.get('/user').then(response => {
                //commit ke mutatuin GET_USER dengan hasil response
                commit('GET_USER', response.data)
            })
        },
        login({ commit, dispatch }, user) {
            return new Promise((resolve, reject) => {
                Api.post(`/login`, {
                    email: user.email,
                    password: user.password,
                }).then((response) => {

                    const token = response.data.data.token
                    const user = response.data.data.user

                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))

                    Api.defaults.headers.common['Authorization'] = "Bearer " + token

                    commit('AUTH_SUCCESS', token, user)

                    commit('GET_USER', user)


                    //////////// =======================================/////////////////
                    //////////// Handel Cart ////////////////

                    dispatch('cart/cartCount', response.data, { root: true })
                    dispatch('cart/cartTotal', response.data.total, { root: true })

                    //////////// =======================================/////////////////

                    resolve(response)
                }).catch((error) => {
                    localStorage.removeItem('token')
                    reject(error.response.data)
                });
            });
        },

        logout({ commit }) {
            return new Promise((resolve, reject) => {

                commit('AUTH_LOGOUT')

                localStorage.removeItem('token')
                localStorage.removeItem('user')

                /// ========== Handel Cart ========= \\\
                commit('cart/SET_CARTS_DATA', 0, { root: true })
                commit('cart/SET_CART_PRICE', 0, { root: true })

                //delete header axios
                delete Api.defaults.headers.common['Authorization']

                resolve()
            });

        }
    },

    getters: {
        currentUser(state) {
            return state.user // <-- return dengan data user
        },
        //loggedIn
        isLoggedIn(state) {
            return state.token // return dengan data token
        },
    }
}

export default auth