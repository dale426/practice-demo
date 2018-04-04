<template>
  <div>
    <h1>{{msg}}</h1>
    <button @click="goHome">go to home page</button>
    <button @click="goPageNo">go to home 404</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    goHome () {
      this.$router.push({path: '/home'})
    },
    goPageNo() {
      this.$router.push({path: '/404'})
      
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
