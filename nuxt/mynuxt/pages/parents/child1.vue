<template>
  <section class="container">
    <h1>
      我是子组件1
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
