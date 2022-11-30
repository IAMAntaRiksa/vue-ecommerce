import Api from '../../api/Api';

const slider = {
    namespaced: true,

    state: {
        sliders: []
    },

    mutations: {
        GET_SLIDERS(state, payload) {
            state.sliders = payload
        }
    },

    actions: {
        getSliders({ commit }) {
            return new Promise((resolve, reject) => {
                Api.get('/v1/sliders').then((response) => {
                    commit('GET_SLIDERS', response.data.data)
                    resolve()
                }).catch((err) => {
                    console.log(err.response.data)
                    reject(err.response.data)
                });
            });
        }
    }
}
export default slider