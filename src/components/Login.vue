<template>
  <container>
    <row class="mt-5 align-items-center justify-content-center">
      <column md="6">
        <form @submit="onSubmit" @reset="onReset" class="needs-validation" novalidate v-if="showForm">
          <p class="h4 text-center mb-4">{{ $t('message.auth.pageTitle') }}</p>
          <div class="grey-text">
            <mdb-input-custom v-model="form.email" name="email" :label="$t('message.auth.labelEmail')" icon="envelope"
                              type="email" required v-validate="'required|email'"
                              :validation-error="errors.first('email')"/>

            <mdb-input-custom v-model="form.password" name="password" :label="$t('message.auth.labelPassword')"
                              icon="lock" type="password" required v-validate="'required|min:6'"
                              :validation-error="errors.first('password')"/>
          </div>
          <div class="text-center">
            <btn color="primary" type="submit">{{ $t('message.auth.buttonLogin') }}</btn>
            <btn outline="default" type="reset">{{ $t('message.auth.buttonReset') }}</btn>
          </div>
        </form>
      </column>
    </row>

    <h4>Success</h4>
    <btn rounded color="default" @click.native="showLoginFailedModal=true">launch danger modal
      <fa icon="eye" class="ml-1"/>
    </btn>
    <modal v-if="showLoginFailedModal" @close="showLoginFailedModal = false" danger>
      <modal-header>
        <modal-title>Danger Modal</modal-title>
      </modal-header>
      <modal-body>
        <row>
          <column col="3" class="text-center">
            <fa icon="shopping-cart" size="4x"/>
          </column>
          <column col="9">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, molestiae provident
              temporibus sunt earum.</p>
            <h2>
              <badge>v52gs1</badge>
            </h2>
          </column>
        </row>
      </modal-body>
      <modal-footer center>
        <btn color="danger" @click.native="showLoginFailedModal = false">Get it now
          <fa icon="diamond" class="ml-1" color="white"/>
        </btn>
        <btn outline="danger" @click.native="showLoginFailedModal = false">No, thanks</btn>
      </modal-footer>
    </modal>

    <p>Authenticated: {{ this.isAuthenticated }}</p>
  </container>

</template>

<script>
  import * as Const from '../const';
  import {
    Badge,
    Btn,
    Column,
    Container,
    Fa,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    Row
  } from 'mdbvue';
  import mdbInputCustom from './MdbInputCustom';

  export default {
    name: 'login',
    components: {
      Container,
      Row,
      Column,
      Fa,
      mdbInputCustom,
      Btn,
      Modal,
      ModalHeader,
      ModalTitle,
      ModalBody,
      ModalFooter,
      Badge
    },
    data () {
      return {
        form: {
          email: '',
          password: ''
        },
        showForm: true,
        showLoginFailedModal: false
      };
    },
    computed: {
      isAuthenticated () {
        return this.$store.state.isAuthenticated;
      }
    },
    methods: {
      onSubmit (event) {
        event.preventDefault();

        this.$validator.validate()
          .then(result => {
            if (result) {
              // Validation is OK, proceed with login
              let user = {
                email: this.form.email,
                password: this.form.password
              };

              this.$store.dispatch('login', {user, requestOptions: {}})
                .then(() => {
                  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
                    console.log('User authenticated');
                  }
                })
                .catch(() => {
                  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
                    console.log('User authentication failed');
                  }
                  this.showLoginFailedModal = true;
                });
            }
          });
      },

      onReset (event) {
        event.preventDefault();

        // Reset our form values
        // TODO Material input uses $emit inside component. To handle input value changes use @input event instead of v-model.
        this.form.email = '';
        this.form.password = '';

        // Trick to reset/clear native browser form validation state
        this.showForm = false;
        this.$nextTick(() => {this.showForm = true;});
      }
    }
  };
</script>

<style scoped>

</style>
