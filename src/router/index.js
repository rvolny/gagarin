import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home';
import Login from '../components/Login';
import Registration from '../components/Registration';
import Sender from '../components/Sender';
import Courier from '../components/Courier';
import Package from '../components/Package';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/profile/sender',
      name: 'Sender',
      component: Sender
    },
    {
      path: '/profile/courier',
      name: 'Courier',
      component: Courier
    },
    {
      path: '/package',
      name: 'Package',
      component: Package
    }
  ]
});
