import * as fb from 'firebase';

class User {
    constructor(id, role) {
        this.id = id
        this.role = role
    }
}

export default {
    state: {
        user: null
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
                const userFb = await fb.auth().createUserWithEmailAndPassword(email, password)
                const user = new User(userFb.uid, role)
                await fb.database().ref('users').push(user)
                commit('setUser', user)
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        async loginUser({ commit }, { email, password, role }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const userFb = await fb.auth().signInWithEmailAndPassword(email, password)
                const user = new User(userFb.uid, role)
                commit('setUser', user)
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        autoLoginUser({commit}, payload) {
            commit('setUser', new User(payload.uid))
        },
        logoutUser({commit}) {
            fb.auth().signOut()
            commit('setUser', null)
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        isUserLogedIn(state) {
            return state.user !== null
        },
        getUserRole(state) {
            return state.user.role
        }
    }
}