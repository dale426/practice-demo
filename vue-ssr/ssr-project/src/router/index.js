import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Child from '@/components/Child'
import Child2 from '@/components/Child2'


Vue.use(Router)

export function createRouter() {
  return new Router({
    // 使用html5的history模式，全路径匹配方案
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
      },
      {
        path: '*',
        name: 'HelloWorld2',
        component: HelloWorld
      },
      {
        path: '/home',
        name: 'home',
        component: Home,
        children: [
          { path: 'c1', title: '主项目操作', name: 'child',  component: resolve => { require(['@/components/Child.vue'], resolve)} },
          { path: 'c2', title: '主项目操作', name: 'child2',  component: resolve => { require(['@/components/Child2.vue'], resolve)} },
        ]

      },
    ]
  })
}
