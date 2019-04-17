import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './config/fontawesome.js' // Font Awesome config
import './config/bootstrap.js' // Bootstrap config
import './config/moment.js' // Moment config


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
