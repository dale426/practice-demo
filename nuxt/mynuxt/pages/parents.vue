<template>
  <div>
    <section class="body">
        <div class="head">
            <h1>header</h1>
            <a href="/parents/child1">tab1</a>
            <a href="/parents/child2">tab2</a>
            <button
            @click="btnClick">
                按钮
            </button>
        </div>
        <div class="left">
            this is left!
        </div>
        <div class="right">
            <nuxt-child/>
        </div>
    </section>
    
    <footer class="footer">

    </footer>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'home',
  transition: 'test',
  data() {
    return {

    }
  },
  components: {},
  computed: {
    menuTheme() {
      return this.$store.state.user.test
    }
  },
  methods:{
      btnClick() {
          console.log(this.$route)
          this.$router.push({path: '/parents/child1'})
      }
  }
}
</script>

<style lang="less">
    .head{
        width: 100%;
        height: 120px;
        background: lightgrey;
    }
    .left{
        width: 200px;
        min-height: 400px;
        float: left;
        background: lightskyblue;
    }
    .right{
        margin-left: 240px;
        overflow: hidden;
        background: lightcyan;
    }
</style>
