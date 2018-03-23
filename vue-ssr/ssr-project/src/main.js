import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'

Vue.config.productionTip = false

export default function () {
  const store = createStore()
  const router = createRouter()
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })
  return {app, router, store}
}

/* eslint-disable no-new */
/* 
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}) */
