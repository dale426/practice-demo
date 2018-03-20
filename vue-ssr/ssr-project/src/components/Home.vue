<template>
  <div>
    <h1 class="wrapper">Home</h1>
    <div class="nav">
        <router-link to="/home/c1">组件1</router-link>
        <router-link to="/home/c2">组件2</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
      return {

      }
  }
}
</script>
<style lang="less">
    .wrapper{
        background: lightblue;
    }
</style>

