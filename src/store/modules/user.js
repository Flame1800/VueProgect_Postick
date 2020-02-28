import * as fb from 'firebase';

class User {
    constructor(email, id = 0, role ) {
        this.email = email
        this.id = id
        this.role = role
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
                commit('setUser', new User(email, user.uid, role))
                await fb.database().ref('users').push(new User(email, user.uid, role))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
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
                const role = Object.keys(users).forEach(key => {
                    if (users[key].email === email) {
                        return users[key].role
                    }
                })
                commit('setUser', new User(email, user.uid, role))
                commit('setLoading', false)
            } catch (error) {
                commit('setError', error.message)
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
        },
        userEmail(state) {
            return state.user.email
        }
    }
}