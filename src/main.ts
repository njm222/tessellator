import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueGtag from 'vue-gtag'

Vue.use(VueAxios, axios)
Vue.use(VueGtag, {
  config: {
    id: 'UA-133459521-1'
  }
}, router)

Vue.config.productionTip = process.env.NODE_ENV

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
