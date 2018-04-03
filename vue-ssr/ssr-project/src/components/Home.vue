<template>
  <div>
    <h1 class="wrapper">Home</h1>
    <div class="nav">
        <router-link to="/home/c1">组件1</router-link>
        <router-link to="/home/c2">组件2</router-link>
    </div>
    <div>
      <h4>异步数据:  </h4>
      <div> {{ content }} </div>
      <div> {{ item }} </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'home',
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem', route.params.id)
  },
  data () {
    return {
      content: ''
    }
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
      console.log(this.$store.state.items[this.$route.params.id])
      return this.$store.state.items[this.$route.params.id]
    }
  },
  methods: {

  }
}
</script>
<style lang="less">
    .wrapper{
        background: lightblue;
    }
</style>
