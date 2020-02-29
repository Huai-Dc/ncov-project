import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters";
import navigator from './modules/navigator'
import ncov from './modules/ncov'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        navigator,
        ncov
    },
    getters
})
