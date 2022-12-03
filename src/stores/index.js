//import vuex
import { createStore } from 'vuex'

import auth from './module/auth'
import category from './module/category'
import slider from './module/slider'
import product from './module/product'
import cart from './module/cart'
import order from './module/order'
import ongkir from './module/ongkir'


export default createStore({
    modules: {
        auth,
        category,
        slider,
        product,
        cart,
        order,
        ongkir
    }
})