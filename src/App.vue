<template>
  <div class="flexible-content">

    <!-- Navbar begin -->
    <navbar position="top" dark color="primary" scrolling>
      <mdb-navbar-brand tag="div">
        <!--TODO: resize image to correct size-->
        <router-link :to="{name: 'Home'}" id="home-logo">
          <img src="./assets/gagarin-logo-white-transparent.png" alt="" height="32"/>
          <b><i>{{ $t('message.app.name') }}</i></b></router-link>
      </mdb-navbar-brand>
      <navbar-collapse>

        <!-- Navbar left begin -->
        <!--<navbar-nav>-->
        <!--<navbar-item :href="this.$router.resolve({name:'Home'}).route.path" router waves-fixed>{{-->
        <!--$t('message.menu.home') }}-->
        <!--</navbar-item>-->
        <!--</navbar-nav>-->
        <!-- Navbar left end -->

        <!-- Navbar right begin -->
        <navbar-nav right>
          <navbar-item v-if="!isAuthenticated" router waves-fixed @click.native="$router.push({name: 'Login'})">{{
            $t('message.menu.login') }}
          </navbar-item>
          <navbar-item href="#" router waves-fixed v-if="isAuthenticated">
            <fa icon="envelope"/>
          </navbar-item>
          <dropdown tag="li" class="nav-item" v-if="isAuthenticated">
            <dropdown-toggle tag="a" navLink slot="toggle" waves-fixed>{{ this.user.name }}
            </dropdown-toggle>
            <dropdown-menu>
              <dropdown-item @click.native="logout">{{ $t('message.menu.logout') }}</dropdown-item>
            </dropdown-menu>
          </dropdown>
        </navbar-nav>
        <!-- Navbar right end -->

      </navbar-collapse>
    </navbar>
    <!-- Navbar end -->

    <main>
      <div class="mt-5 p-2">
        <transition
          name="fade"
          mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </main>

    <!-- Footer -->
    <Footer color="blue" class="font-small x-pt-4 mt-4">
      <!--<container class="text-left">-->
      <!--<row>-->
      <!--<column sm="6">-->
      <!--<h5 class="title">Footer Content</h5>-->
      <!--<p>Here you can use rows and columns here to organize your footer content.</p>-->
      <!--</column>-->
      <!--<column sm="6">-->
      <!--<h5 class="title">Links</h5>-->
      <!--<ul>-->
      <!--<li class="list-unstyled"><a href="#">Link 1</a></li>-->
      <!--<li class="list-unstyled"><a href="#">Link 2</a></li>-->
      <!--<li class="list-unstyled"><a href="#">Link 3</a></li>-->
      <!--<li class="list-unstyled"><a href="#">Link 4</a></li>-->
      <!--</ul>-->
      <!--</column>-->
      <!--</row>-->
      <!--</container>-->
      <div class="footer-copyright text-center py-3">
        <container fluid>
          &copy; {{ new Date().getFullYear() }} {{ $t('message.app.copyright') }} <a href="#">{{
          $t('message.app.copyrightName') }}</a>
        </container>
      </div>
    </Footer>
    <!-- Footer -->

  </div>
</template>

<script>
  import * as Const from './const';
  import {
    Column,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fa,
    Footer,
    mdbNavbarBrand,
    Navbar,
    NavbarCollapse,
    NavbarItem,
    NavbarNav,
    Row
  } from 'mdbvue';

  export default {
    name: 'app',
    components: {
      Column,
      Container,
      Dropdown,
      DropdownItem,
      DropdownMenu,
      DropdownToggle,
      Fa,
      Footer,
      mdbNavbarBrand,
      Navbar,
      NavbarCollapse,
      NavbarItem,
      NavbarNav,
      Row
    },
    computed: {
      isAuthenticated () {
        return this.$store.state.isAuthenticated;
      },
      user () {
        return this.$store.state.user;
      }
    },
    watch: {
      isAuthenticated () {
        if (this.isAuthenticated) {
          // TODO Remove user data in case another user is logged in
          // Load user data
          this.$store.dispatch('getUserData');
          // Load all lists
          // TODO Only load lists if not already loaded
          this.$store.dispatch('getLists');
        } else {
          // Remove user data
          this.$store.dispatch('removeUserData');
        }
      }
    },
    mounted () {
      if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
        console.log('Checking for present auth token');
      }
      this.$store.dispatch('checkAuthentication');
    },
    methods: {
      logout (event) {
        event.preventDefault();
        this.$store.dispatch('logout');
      }
    }
  };
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: height, opacity;
    transition-timing-function: ease;
    overflow: hidden;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>

<style>
  .navbar .dropdown-menu a:hover {
    color: inherit !important;
  }

  #home-logo {
    color: white;
  }

  .invalid-feedback-custom {
    display: block;
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
  }

  .is-invalid-custom {
    border-color: #dc3545 !important;
  }

  .input-select-custom .select-wrapper {
    width: 100%;
    margin-bottom: 0;
  }

  .input-select-custom .select-wrapper .select-dropdown {
    margin-bottom: 0;
  }
</style>
