import Api from '../../api/Api'

const order = {
    namespaced: true,
    state: {
        orders: [],
        order: {},
    },

    mutations: {
        SET_ORDERS_DATA(state, payload) {
            state.orders = payload
        },

        SET_ORDER_DATA(state, payload) {
            state.order = payload
        }
    },
    actions: {
        async getOrders({ commit }) {
            try {
                const { data } = await Api.get('/order')
                commit('SET_ORDERS_DATA', data.data)
            } catch (error) {
                console.log(error)
            }
        },

        async getDetailOrder({ commit }, snap_token) {
            try {
                const { data } = await Api.get(`/order/${snap_token}`)
                commit('SET_ORDER_DATA', data.data.data)
            } catch (error) {
                console.log(error)
            }
        }
    },

    getters: {
        detailOrder(state) {
            return state.order
        }
    }
}

export default order