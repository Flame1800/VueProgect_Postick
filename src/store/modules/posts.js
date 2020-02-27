`use strict`
import * as fb from 'firebase'

class Post {
    constructor(title, description, claps, createdAt, id = 0) {
        this.title = title
        this.description = description
        this.claps = claps
        this.createdAt = createdAt
        this.id = id
    }
}

export default {
    state: {
        posts: []
    },
    mutations: {
        createPost(state, payload) {
            state.posts.push(payload)
        },
        loadPosts(state, payload) {
            state.posts = payload
        },
        updatePost(state, { title, description, id }) {
            const post = state.posts.find(a => {
                return a.id === id
            })
            post.title = title
            post.description = description
        },
       
    },
    actions: {
        async createPost({ commit, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const newPost = new Post(
                    payload.title,
                    payload.description,
                    payload.claps,
                    payload.createdAt,
                    getters.user.id
                )
                await fb.database().ref('posts').push(newPost)
                commit('setLoading', false)

            } catch (error) {
                commit('setLoading', false)
                throw error
            }
        },
        async fetchPosts({ commit }) {
            commit('clearError')
            commit('setLoading', true)
            const resultPosts = []
            try {
                const postsValue = await fb.database().ref('posts').once('value')
                const posts = postsValue.val()
                Object.keys(posts).forEach(key => {
                    const post = posts[key]
                    resultPosts.push(
                        new Post(
                            post.title,
                            post.description,
                            post.claps,
                            post.createdAt,
                            key
                        )
                    )
                    commit('loadPosts', resultPosts)
                    commit('setLoading', false)
                })
            } catch (error) {
                commit('setLoading', false)
                throw error
            }
        },
        async updatePost({ commit }, { title, description, id }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                await fb.database().ref('users').child(id).update({
                    title,
                    description
                })
                commit('updatePost', {
                    title,
                    description,
                    id
                })
                commit('setLoading', false)

            } catch (error) {
                commit('setLoading', false)
                throw error
            }
        },
        async deletePost({ commit }, {id}) {
            commit('clearError')
            commit('setLoading', true)
            try {
                await fb.database().ref('posts').child(id).remove()
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                throw error
            }
        },
    },
    getters: {
        posts(state) {
            return state.posts
        },
        postById(state) {
            return id => {
                return state.posts.find(post => post.id === id)
            }
        }
    },
}
