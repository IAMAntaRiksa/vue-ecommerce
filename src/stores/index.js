//import vuex
import { createStore } from 'vuex'

import auth from './module/auth'
import category from './module/category'
import slider from './module/slider'


export default createStore({
    modules: {
        auth,
        category,
        slider,
        // product,
        // cart,
    }
})