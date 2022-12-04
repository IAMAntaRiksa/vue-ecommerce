import Api from '../../api/Api';

const slider = {
    namespaced: true,

    state: {
        sliders: []
    },

    mutations: {
        SET_SLIDERS_DATA(state, payload) {
            state.sliders = payload
        }
    },

    actions: {
        getSliders({ commit }) {
            return new Promise((resolve, reject) => {
                Api.get('/v1/sliders').then((response) => {
                    commit('SET_SLIDERS_DATA', response.data.data)
                    resolve()
                }).catch((err) => {
                    reject(err.response.data)
                });
            });
        }
    }
}
export default slider