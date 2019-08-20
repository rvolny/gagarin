<template>
  <smooth-reflow>
    <container v-if="!this.$store.getters.isAuthenticated">
      <div class="hello">
        <!--TODO: resize image to correct size-->
        <img src="../assets/gagarin-logo-blue.png" :alt="$t('message.app.name')" width="320"/>
        <p class="mt-3">{{ $t('message.homepage.tagline') }}</p>
        <p>
          <router-link :to="{name: 'Login'}">{{ $t('message.menu.login') }}</router-link>
          |
          <router-link :to="{name: 'Registration'}">{{ $t('message.menu.registration') }}</router-link>
        </p>
      </div>
    </container>

    <container fluid v-if="this.$store.getters.isAuthenticated">
      <row>
        <column lg="4" md="6" sm="12" class="mb-3" v-if="!this.$store.getters.isSender">
          <card class="text-center">
            <mdb-icon icon="paper-plane" size="5x" class="amber-text pt-3"/>
            <card-body>
              <card-title>{{ $t('message.homepage.cards.becomeSender.label') }}</card-title>
              <card-text>{{ $t('message.homepage.cards.becomeSender.text') }}</card-text>
              <btn color="primary" @click="$router.push({name: 'Sender'})">{{
                $t('message.homepage.cards.becomeSender.button') }}
              </btn>
            </card-body>
          </card>
        </column>
        <column lg="4" md="6" sm="12" class="mb-3" v-if="this.$store.getters.isSender">
          <card class="text-center">
            <mdb-icon icon="box" size="5x" class="green-text pt-3"/>
            <card-body>
              <card-title>{{ $t('message.homepage.cards.sendPackage.label') }}</card-title>
              <card-text>{{ $t('message.homepage.cards.sendPackage.text') }}</card-text>
              <btn color="primary" @click="$router.push({name: 'Package'})">{{
                $t('message.homepage.cards.sendPackage.button') }}
              </btn>
            </card-body>
          </card>
        </column>
        <column lg="4" md="6" sm="12" class="mb-3" v-if="!this.$store.getters.isCourier">
          <card class="text-center">
            <mdb-icon icon="cubes" size="5x" class="red-text pt-3"/>
            <card-body>
              <card-title>{{ $t('message.homepage.cards.becomeCourier.label') }}</card-title>
              <card-text>{{ $t('message.homepage.cards.becomeCourier.text') }}</card-text>
              <btn color="primary" @click="$router.push({name: 'Courier'})">{{
                $t('message.homepage.cards.becomeCourier.button') }}
              </btn>
            </card-body>
          </card>
        </column>
      </row>
    </container>

  </smooth-reflow>
</template>

<script>
  import { Btn, Card, CardBody, CardImg, CardText, CardTitle, Column, Container, mdbIcon, Row } from 'mdbvue';

  export default {
    name: 'home',
    components: {Btn, Card, CardImg, CardBody, CardTitle, CardText, Column, Container, Row, mdbIcon},
    data () {
      return {};
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
</style>
