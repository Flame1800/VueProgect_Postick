import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as fb from 'firebase/app';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    const firebaseConfig = {
      apiKey: "AIzaSyC6x8cq-YCop1d7NPkxP85Qj_YS6gtgHSQ",
      authDomain: "blog-6a183.firebaseapp.com",
      databaseURL: "https://blog-6a183.firebaseio.com",
      projectId: "blog-6a183",
      storageBucket: "blog-6a183.appspot.com",
      messagingSenderId: "915450180373",
      appId: "1:915450180373:web:cbed22483b377aedbe6f1c",
      measurementId: "G-YS5YKC451Z"
    };
    // Initialize Firebase
    fb.initializeApp(firebaseConfig);

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
  }
}) 
