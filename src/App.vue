<template>
  <div id="app">
    <b-container fluid>
      <img src="./assets/logo.png">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
  // TODO onload check status of vueAuth.isAuthenticated()
  export default {
    name: 'app'
  }
</script>

<style>
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }
</style>
