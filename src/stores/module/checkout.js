import Api from '../../api/Api';
const checkout = {
    namespaced: true,
    actions: {
        //store checkout
        storeCheckout({ dispatch }, payload) {
            return new Promise((resolve, reject) => {
                //store to Rest API "/api/web/checkout" with method "POST"
                Api.post('/checkout', payload)
                    .then((response) => {

                        //dispatch cart
                        dispatch('cart/cartCount', null, { root: true })

                        resolve(response.data)
                    }).catch(error => {
                        reject(error)
                    })
            })
        },
    }
}

export default checkout