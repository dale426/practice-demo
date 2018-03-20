<template>
  <section class="container">
      <Main> 
          <div>
              neirong
              <button @click="btnRequest">发起请求</button>
          </div>
          <h1> {{ menuTheme }} </h1>
          <h2> {{ totalNum }} </h2>
          <div>
            <Button type="primary">ivew</Button>
          </div>
      </Main>
  </section>
</template>

<script>
import Main from '~/components/main.vue'
import {mapState, mapMutations} from 'vuex'
import api from '~/plugins/api/index.js'

export default {
  name: 'home',
  transition: 'test',
  data() {
    return {
      totalNum: '',
      projectData: ''
    }
  },
  components: {
    Main
  },
  computed: {
    menuTheme() {
      return this.$store.state.user.test
    }
  },
  methods: {
    btnRequest() {
      let params = {name: 'liyulong'}
      api.use("getProjectList", params, response => {
        console.log("res", response)
        this.totalNum = response.name;
        this.projectData = response.name;
      });
    }
  }
}
</script>

<style>

</style>
