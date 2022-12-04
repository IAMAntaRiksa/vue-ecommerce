import Api from '../../api/Api'

const ongkir = {
    namespaced: true,
    state: {
        provincies: [],
        cities: [],
    },

    mutations: {
        SET_PROVINCIES_DATA(state, payload) {
            state.provincies = payload
        },
        SET_CITIES_DATA(state, payload) {
            state.cities = payload
        }
    },
    actions: {
        async getProvincies({ commit }) {
            try {
                const token = localStorage.getItem('token')
                Api.defaults.headers.common['Authorization'] = "Bearer " + token

                const { data } = await Api.get('/rajaongkir/provinces')

                commit('SET_PROVINCIES_DATA', data)
            } catch (error) {
                console.log(error)
            }
        },

        async getCities({ commit }, province_id) {
            try {

                const token = localStorage.getItem('token')
                Api.defaults.headers.common['Authorization'] = "Bearer " + token

                const { data } = await Api.get('/rajaongkir/cities', {
                    params: {
                        province_id: province_id
                    }
                })

                commit('SET_CITIES_DATA', data)
            } catch (error) {
                console.log(error)
            }
        },

        // async getOngkir({ dispatch }, { ongkir }) {
        //     try {
        //         const token = localStorage.getItem('token')
        //         Api.defaults.headers.common['Authorization'] = "Bearer " + token

        //         const { data } = await Api.post('/rajaongkir/checkOngkir', {
        //             destination: ongkir.destination,
        //             weight: ongkir.weight,
        //             courier: ongkir.courier
        //         })
        //         console.log(data.data.costs)
        //         dispatch('getCities')
        //         dispatch('getProvincies')
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
    }
}

export default ongkir