import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import newPost from '@/components/Products/newPost'
import Posts from '@/components/Products/Posts'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import AuthGuard from './auth-guard'
import EditPost from '@/components/Products/EditPost'
import Post from '@/components/Products/Post'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/edit',
      props: true,
      name: 'EditPost',
      component: EditPost
    },
    {
      path: '/post/:id',
      props: true,
      name: 'post',
      component: Post
    },
    {
      path: '/list',
      name: 'list',
      component: Posts,
      beforeEnter: AuthGuard
    },
    {
      path: '/new',
      name: 'new',
      component: newPost,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },

  ],
  mode: 'history'
})
