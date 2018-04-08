import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import axios from 'axios'
import { sync } from 'vuex-router-sync'
Vue.config.productionTip = false
Vue.prototype.$http = axios

export default function () {
  const store = createStore()
  const router = createRouter()
  // 同步路由状态(route state)到 store
  sync(store, router)
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })
  return {app, router, store}
}
