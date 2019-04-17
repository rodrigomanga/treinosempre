import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './config/fontawesome.js' // Font Awesome config
import './config/bootstrap.js' // Bootstrap config
import './config/moment.js' // Moment config
import DbService from './components/DbService.js'

Vue.prototype.$dbService = new DbService();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
