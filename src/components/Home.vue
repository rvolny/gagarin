<template>
  <smooth-reflow>
    <container fluid>
      <row>
        <column col="4" v-if="this.$store.getters.isAuthenticated && !this.$store.getters.isSender">
          <card>
            <card-img src="logo.png" alt="Card image cap" waves></card-img>
            <card-body>
              <card-title>Sender</card-title>
              <card-text>Update profile to become sender</card-text>
              <btn color="primary" @click="$router.push({name: 'Sender'})">Become sender</btn>
            </card-body>
          </card>
        </column>
        <column col="4" v-if="this.$store.getters.isSender">
          <card>
            <card-img src="logo.png" alt="Card image cap" waves></card-img>
            <card-body>
              <card-title>Package</card-title>
              <card-text>Send a package</card-text>
              <!--<btn color="primary" @click="$router.push({name: 'Sender'})">Send package</btn>-->
            </card-body>
          </card>
        </column>
        <column col="4" v-if="this.$store.getters.isAuthenticated && !this.$store.getters.isCourier">
          <card>
            <card-img src="logo.png" alt="Card image cap" waves></card-img>
            <card-body>
              <card-title>Courier</card-title>
              <card-text>Update profile to become courier</card-text>
              <btn color="primary" @click="$router.push({name: 'Courier'})">Become courier</btn>
            </card-body>
          </card>
        </column>
      </row>
    </container>

    <div class="hello">
      <h1>{{ msg }} - {{ $t('message.welcome') }}</h1>
      <p>
        <router-link to="/login">Login</router-link>
        |
        <router-link to="/registration">Registration</router-link>
      </p>
      <h2>Essential Links</h2>
      <ul>
        <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
        <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
        <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
        <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
        <br>
        <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
      </ul>
      <h2>Ecosystem</h2>
      <ul>
        <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
        <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
        <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
        <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
      </ul>
    </div>
  </smooth-reflow>
</template>

<script>
  import { Btn, Card, CardBody, CardImg, CardText, CardTitle, Column, Container, Row } from 'mdbvue';

  export default {
    name: 'home',
    components: {Btn, Card, CardImg, CardBody, CardTitle, CardText, Column, Container, Row},
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      };
    },
    computed: {
      user () {
        return this.$store.state.user;
      }
    }
  };
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
