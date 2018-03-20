<template>
  <section class="container">
    <h1>
      我是子组件2
    </h1>
    <div>
      {{ menuTheme }}
    </div>
  </section>
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
  components: {
  },
  computed: {
    menuTheme() {
      return this.$store.state.user.test
    }
  }
}
</script>

<style>

</style>
