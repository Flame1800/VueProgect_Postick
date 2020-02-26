import Vue from 'vue'
import Vuex from 'vuex'
import posts from './modules/posts'
import user from './modules/user'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        posts,
        user, 
        common
    }
})