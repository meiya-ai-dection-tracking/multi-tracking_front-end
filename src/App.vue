<template>
  <div id="app">
    <router-view :key="key"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      height: 0
    }
  },
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
