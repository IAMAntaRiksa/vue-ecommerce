//import vuex
import { createStore } from 'vuex'

import auth from './module/auth'
import category from './module/category'
import slider from './module/slider'
import product from './module/product'
import cart from './module/cart'
export default createStore({
    modules: {
        auth,
        category,
        slider,
        product,
        cart,
    }
})