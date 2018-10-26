<template>
  <smooth-reflow>
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
              <btn outline="primary" type="reset">{{ $t('message.auth.buttonReset') }}</btn>
            </div>
            <p class="font-small grey-text d-flex justify-content-end mt-4">{{ $t('message.auth.notMember') }}
              <router-link :to="{ name: 'Registration'}" class="blue-text ml-1">{{ $t('message.auth.register') }}
              </router-link>
            </p>
          </form>
        </column>
      </row>

      <modal v-if="showLoginFailedModal" @close="showLoginFailedModal = false" danger>
        <modal-header>
          <modal-title>{{ $t('message.auth.loginFailedTitle') }}</modal-title>
        </modal-header>
        <modal-body>
          <row>
            <column col="3" class="text-center">
              <fa icon="exclamation" size="4x"/>
            </column>
            <column col="9">
              <p>{{ $t('message.auth.loginFailedText') }}</p>
            </column>
          </row>
        </modal-body>
        <modal-footer center>
          <btn color="danger" @click.native="showLoginFailedModal = false">{{ $t('message.auth.loginFailedButton') }}
          </btn>
        </modal-footer>
      </modal>
    </container>
  </smooth-reflow>
</template>

<script>
  import * as Const from '../const';
  import { Btn, Column, Container, Fa, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'mdbvue';
  import mdbInputCustom from './MdbInputCustom';

  export default {
    name: 'login',
    components: {
      Btn, Column, Container, Fa, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row, mdbInputCustom
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
      // Submit login form
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
                    console.log('✓ User authenticated');
                  }
                  this.$router.push({name: 'Home'});
                })
                .catch(() => {
                  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
                    console.log('✗ User authentication failed');
                  }
                  this.showLoginFailedModal = true;
                });
            }
          });
      },

      // Reset form to original state
      onReset (event) {
        event.preventDefault();

        // Reset our form values
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
