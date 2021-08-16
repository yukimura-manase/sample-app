import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import firebase from 'firebase'

Vue.config.productionTip = false

// firebaseを利用するためのコード
// Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      var firebaseConfig = {
        apiKey: "AIzaSyBTHj6f3whBs2d1fLQ32ZiQ6teUNvAqfUY",
        authDomain: "address-vue-project.firebaseapp.com",
        projectId: "address-vue-project",
        storageBucket: "address-vue-project.appspot.com",
        messagingSenderId: "622158469398",
        appId: "1:622158469398:web:dac507a15143c505179837",
        measurementId: "G-7KZF05G4SL"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
