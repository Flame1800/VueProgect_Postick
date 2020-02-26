import * as fb from 'firebase'

class Post {
    constructor(title, description, claps, createdAt) {
        this.title = title
        this.description = description
        this.claps = claps
        this.createdAt = createdAt
    }
}

export default {
    state: {
        posts: [
            {
                "id": 1,
                "title": "Пост про текст",
                "description": "Текст",
                "claps": 0,
                "createdAt": "2019-09-29T00:00:00.000Z",
                "updateAt": "2019-09-29T00:00:00.000Z",
                "userId": 1
              },
              {
                "id": 2,
                "title": "Прост про какие то англ слова",
                "description": "“There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.”",
                "claps": 0,
                "createdAt": "2019-09-29T00:00:00.000Z",
                "updateAt": "2019-09-29T00:00:00.000Z",
                "userId": 1
              },
              {
                "id": 3,
                "title": "Пост про контейнер",
                "description": "card: the main container",
                "claps": 0,
                "createdAt": "2019-09-29T00:00:00.000Z",
                "updateAt": "2019-09-29T00:00:00.000Z",
                "userId": 1
              },
        ]
    },
    mutations: {},
    actions: {
        async createPost({commit}, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const newPost = new Post(
                    payload.title,
                    payload.description,
                    payload.claps,
                    payload.createdAt
                )
                const post = await fb.database().ref('blog').push(newPost)
                console.log(post)
            } catch(error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        }
    },
    getters: {
        posts(state) {
            return state.posts
        },
        postById (state) {
            return id => {
                return state.posts.find(post => post.id === id)
            }
        }
    },
}
