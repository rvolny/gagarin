<template>
  <div id="app">
    <b-container fluid>
      <img src="./assets/logo.png">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
  import * as Const from './const'

  export default {
    name: 'app',
    mounted: function () {
      if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
        console.log('Checking for present auth token')
      }
      this.$store.dispatch('checkAuthentication')
    }
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
