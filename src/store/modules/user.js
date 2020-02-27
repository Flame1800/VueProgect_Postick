import * as fb from 'firebase';

class User {
    constructor(id = 0, role = 'writer', ) {
        this.role = role
        this.id = id
    }
}

export default {
    state: {
        user: {
            role: 'null',
            id: 0
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        async registerUser({ commit }, { email, password, role }) {
            commit('clearError')
            commit('setLoading', true)

            try {
                const user = await fb.auth().createUserWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid, role))
                await fb.database().ref('users').push(new User(user.uid, role))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                throw error
            }
        },
        async loginUser({ commit }, { email, password }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const user = await fb.auth().signInWithEmailAndPassword(email, password)
                const userVal = await fb.database().ref('users').once('value')
                const users = userVal.val()
                Object.keys(users).forEach(key => {})
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                throw error
            }
        },
        autoLoginUser({ commit }, payload) {
            commit('setUser', new User(payload.uid))
        },
        logoutUser({ commit }) {
            fb.auth().signOut()
            commit('setUser', null)
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        userLoggedIn(state) {
            return state.user !== null 
        },
        userRole(state) {
            return state.user.role
        }
    }
}