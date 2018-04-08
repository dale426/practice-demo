import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import { resolve } from '_tsconfig@7.0.0@tsconfig';

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItem ({ commit }, { id }) {
        // console.log('id', id)
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return new Promise(( resolve, reject) => {
          axios({
            method: 'get',
            url: 'http://localhost:8011/api',
            data: {
              name: 'demoData'
            }
          })
          .then(function (item) {
            commit('setItem', { id, item: item.data })
            resolve()
          })
          .catch(function (err) {
            console.log(err)
            reject()
          })
        })
      }
    },
    mutations: {
      setItem (state, { id, item }) {
        state.items = {...state.items, [id]: {...item}}
      }
    }
  })
}
