import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import http from './services'

// set auth header
http.defaults.headers.common['Authorization'] = `Bearer ${store.state.auth.token}`

Vue.config.productionTip = false

Vue.use(require('vue-moment'))

Vue.prototype.$backendURL = 'http://192.168.88.146:5000';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
