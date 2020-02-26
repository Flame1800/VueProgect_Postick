import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from './store'
import * as fb from 'firebase/app';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    var firebaseConfig = {
      apiKey: "AIzaSyBeIEpS3PL5TCGPLUUbF0tF6QVpZN4FU98",
      authDomain: "onlinestore-6075c.firebaseapp.com",
      databaseURL: "https://onlinestore-6075c.firebaseio.com",
      projectId: "onlinestore-6075c",
      storageBucket: "onlinestore-6075c.appspot.com",
      messagingSenderId: "183045285136",
      appId: "1:183045285136:web:5b42c2716bd99be1be7195",
      measurementId: "G-2YHRNCXKNK"
    };
    // Initialize Firebase
    fb.initializeApp(firebaseConfig)

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
  }
}) 
