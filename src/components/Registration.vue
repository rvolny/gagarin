<template>
  <container>
    <row class="mt-5 align-items-center justify-content-center">
      <column md="6">
        <form @submit="onSubmit" @reset="onReset" novalidate v-if="showForm">
          <p class="h4 text-center mb-4">{{ $t('message.registration.pageTitle') }}</p>
          <div class="grey-text">
            <mdb-input-custom v-model="form.name" name="name" :label="$t('message.registration.labelName')" icon="user"
                              type="text" required v-validate="'required|alpha|min:2'"
                              :validation-error="errors.first('name')"/>

            <mdb-input-custom v-model="form.surname" name="surname" :label="$t('message.registration.labelSurname')"
                              icon="user" type="text" required v-validate="'required|alpha|min:2'"
                              :validation-error="errors.first('surname')"/>

            <mdb-input-custom v-model="form.email" name="email" :label="$t('message.registration.labelEmail')"
                              icon="envelope" type="email" required v-validate="'required|email'"
                              :validation-error="errors.first('email')"/>

            <mdb-input-custom v-model="form.password" name="password" :label="$t('message.registration.labelPassword')"
                              icon="lock" type="password" required v-validate="'required|min:6'" ref="confirmation"
                              :validation-error="errors.first('password')"/>

            <mdb-input-custom v-model="form.passwordConfirmation" name="passwordConfirmation"
                              :label="$t('message.registration.labelPasswordConfirmation')" icon="exclamation-triangle"
                              type="password" required v-validate="'required|min:6|confirmed:confirmation'"
                              :validation-error="errors.first('passwordConfirmation')"/>
          </div>
          <div class="text-center">
            <btn color="primary" type="submit">{{ $t('message.registration.buttonRegister') }}</btn>
            <btn outline="primary" type="reset">{{ $t('message.registration.buttonReset') }}</btn>
          </div>
        </form>
      </column>
    </row>

    <modal v-if="showRegistrationSuccessModal" @close="showRegistrationSuccessModal = false" success>
      <modal-header>
        <modal-title>{{ $t('message.registration.registrationSuccessTitle') }}</modal-title>
      </modal-header>
      <modal-body>
        <row>
          <column col="3" class="text-center">
            <fa icon="check" size="4x"/>
          </column>
          <column col="9">
            <p>{{ $t('message.registration.registrationSuccessText') }}</p>
          </column>
        </row>
      </modal-body>
      <modal-footer center>
        <btn color="success" @click.native="showRegistrationSuccessModal = false">{{
          $t('message.registration.registrationSuccessButton') }}
        </btn>
      </modal-footer>
    </modal>

    <modal v-if="showRegistrationFailedModal" @close="showRegistrationFailedModal = false" danger>
      <modal-header>
        <modal-title>{{ $t('message.registration.registrationFailedTitle') }}</modal-title>
      </modal-header>
      <modal-body>
        <row>
          <column col="3" class="text-center">
            <fa icon="exclamation" size="4x"/>
          </column>
          <column col="9">
            <p>{{ $t('message.registration.registrationFailedText') }}</p>
          </column>
        </row>
      </modal-body>
      <modal-footer center>
        <btn color="danger" @click.native="showRegistrationFailedModal = false">{{
          $t('message.registration.registrationFailedButton') }}
        </btn>
      </modal-footer>
    </modal>
  </container>
</template>

<script>
  import * as Const from '../const';
  import { Btn, Column, Container, Fa, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'mdbvue';
  import mdbInputCustom from './MdbInputCustom';
  import raketa from '../api/raketa';
  import smoothReflow from 'vue-smooth-reflow';

  export default {
    name: 'registration',
    components: {
      Btn, Column, Container, Fa, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row, mdbInputCustom
    },
    mixins: [smoothReflow],
    data () {
      return {
        form: {
          name: '',
          surname: '',
          email: '',
          password: '',
          passwordConfirmation: ''
        },
        showForm: true,
        showRegistrationSuccessModal: false,
        showRegistrationFailedModal: false
      };
    },
    mounted () {
      this.$smoothReflow();
    },
    methods: {
      // Submit registration form
      onSubmit (event) {
        event.preventDefault();

        this.$validator.validate()
          .then(result => {
            if (result) {
              // Validation is OK, proceed with registration
              let user = {
                name: this.form.name,
                surname: this.form.surname,
                email: this.form.email,
                password: this.form.password
              };

              // Call registration API
              raketa.createUser(user)
                .then(response => {
                  // User was created,
                  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
                    console.log('✓ User created');
                  }
                  this.showRegistrationSuccessModal = true;
                })
                .catch(response => {
                  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
                    console.log('✗ User registration failed');
                  }
                  this.showRegistrationFailedModal = true;
                });
            }
          });
      },

      // Reset form to original state
      onReset (event) {
        event.preventDefault();

        // Reset our form values
        this.form.name = '';
        this.form.surname = '';
        this.form.email = '';
        this.form.password = '';
        this.form.passwordConfirmation = '';

        // Trick to reset/clear native browser form validation state
        this.showForm = false;
        this.$nextTick(() => {this.showForm = true;});
      }
    }
  };
</script>

<style scoped>

</style>
