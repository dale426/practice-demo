<template>
  <div>
    <h1 class="wrapper">Home</h1>
    <div class="nav">
        <router-link to="/home/c1">组件1</router-link>
        <router-link to="/home/c2">组件2</router-link>
        <button @click="con2">组件2</button>
    </div>
    <router-view></router-view>
    <div> {{item}}</div>
  </div>
</template>
<script>
export default {
  name: 'home',
  asyncData ({ store, route}) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem', {id: 'home1'})
  },
  data() {
      return {

      }
  },
  methods:{
    con2() {
      this.$router.push({path: '/home/c2'})
    }
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
      return this.$store.state.items['home1']
    }
  },
}
</script>
<style lang="less">
    .wrapper{
        background: lightblue;
    }
</style>

