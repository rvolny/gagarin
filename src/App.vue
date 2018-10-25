<template>
  <div class="flexible-content">

    <!--Navbar-->
    <navbar position="top" dark color="primary" scrolling>
      <mdb-navbar-brand tag="div">Raketa</mdb-navbar-brand>
      <navbar-collapse>

        <!-- Navbar left -->
        <navbar-nav>
          <navbar-item :href="this.$router.resolve({name:'Home'}).route.path" router waves-fixed>Home</navbar-item>
          <navbar-item :href="this.$router.resolve({name:'Login'}).route.path" router waves-fixed>Login</navbar-item>
        </navbar-nav>
        <!-- Navbar left -->

        <!-- Navbar right -->
        <navbar-nav right>
          <navbar-item href="#" router waves-fixed>
            <fa icon="envelope"/>
          </navbar-item>
          <dropdown tag="li" class="nav-item">
            <dropdown-toggle tag="a" navLink color="indigo" slot="toggle" waves-fixed>{{ this.user.name }}
            </dropdown-toggle>
            <dropdown-menu>
              <dropdown-item>Logout</dropdown-item>
            </dropdown-menu>
          </dropdown>
        </navbar-nav>
        <!-- Navbar right -->

      </navbar-collapse>
    </navbar>
    <!--Navbar-->

    <main>
      <div class="mt-5 p-5">
        <router-view></router-view>
      </div>
    </main>

    <!-- Footer -->
    <Footer color="blue" class="font-small pt-4 mt-4">
      <container class="text-left">
        <row>
          <column sm="6">
            <h5 class="title">Footer Content</h5>
            <p>Here you can use rows and columns here to organize your footer content.</p>
          </column>
          <column sm="6">
            <h5 class="title">Links</h5>
            <ul>
              <li class="list-unstyled"><a href="#">Link 1</a></li>
              <li class="list-unstyled"><a href="#">Link 2</a></li>
              <li class="list-unstyled"><a href="#">Link 3</a></li>
              <li class="list-unstyled"><a href="#">Link 4</a></li>
            </ul>
          </column>
        </row>
      </container>
      <div class="footer-copyright text-center py-3">
        <container fluid>
          &copy; {{new Date().getFullYear()}} Copyright <a href="#"> Raketa & Gagarin </a>
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
          // Load user data
          this.$store.dispatch('getUserInfo');
        } else {
          // Log out user
          // TODO
        }
      }
    },
    mounted () {
      if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
        console.log('Checking for present auth token');
      }
      this.$store.dispatch('checkAuthentication');
    }
  };
</script>

<style scoped>
</style>

<style>
  .navbar .dropdown-menu a:hover {
    color: inherit !important;
  }
</style>
