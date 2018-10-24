<template>
  <div>
    <container>
      <row class="mt-5 align-items-center justify-content-start">
        <column md="6">
          <form @submit="onSubmit" class="needs-validation" novalidate>
            <p class="h4 text-center mb-4">Sign in</p>
            <div class="grey-text">
              <mdb-input v-model="form.email" label="Your email" icon="envelope" type="email" required/>
              <mdb-input v-model="form.password" label="Your password" icon="lock" type="password" required/>
            </div>
            <div class="text-center">
              <btn>Login</btn>
            </div>
          </form>
        </column>
      </row>

      <h4>Success</h4>
      <btn rounded color="default" @click.native="showSuccessModal = true">launch success modal
        <fa icon="eye" class="ml-1"/>
      </btn>
      <modal v-if="showSuccessModal" @close="showSuccessModal = false" success>
        <modal-header>
          <modal-title>Success Modal</modal-title>
        </modal-header>
        <modal-body class="text-center">
          <fa icon="check" size="4x" class="mb-3 animated rotateIn"/>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit iusto nulla aperiam
            blanditiis ad consequatur in dolores culpa, dignissimos, eius non possimus fugiat.
            Esse ratione fuga, enim, ab officiis totam.
          </p>
        </modal-body>
        <modal-footer center>
          <btn color="success" @click.native="showSuccessModal = false">Get it now
            <fa icon="diamond" class="ml-1" color="white"/>
          </btn>
          <btn outline="success" @click.native="showSuccessModal = false">No, thanks</btn>
        </modal-footer>
      </modal>

      <btn rounded color="default" @click.native="showFailedModal=true">launch danger modal
        <fa icon="eye" class="ml-1"/>
      </btn>
      <modal v-if="showFailedModal" @close="showFailedModal = false" danger>
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
          <btn color="danger" @click.native="showFailedModal = false">Get it now
            <fa icon="diamond" class="ml-1" color="white"/>
          </btn>
          <btn outline="danger" @click.native="showFailedModal = false">No, thanks</btn>
        </modal-footer>
      </modal>

      <p>Authenticated: {{ this.isAuthenticated }}</p>
    </container>

  </div>
</template>

<script>
  import * as Const from '../const';
  import {
    Badge,
    Btn,
    Column,
    Container,
    Fa,
    mdbInput,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    Row
  } from 'mdbvue';

  export default {
    name: 'login',
    components: {
      Container,
      Row,
      Column,
      Fa,
      mdbInput,
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
        showSuccessModal: false,
        showFailedModal: false
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

        let user = {
          email: this.form.email,
          password: this.form.password
        };

        this.$store.dispatch('login', {user, requestOptions: {}})
          .then(() => {
            if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
              console.log('User authenticated');
            }
            this.showSuccessModal = true;
          })
          .catch(() => {
            if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
              console.log('User authentication failed');
            }
            this.showFailedModal = true;
          });
      },

      // TODO - asi nie je potrebne
      onReset (event) {
        event.preventDefault();

        // Reset our form values
        this.form.email = '';
        this.form.password = '';

        // Trick to reset/clear native browser form validation state
        this.show = false;
        this.$nextTick(() => {this.show = true;});
      }
    }
  };
</script>

<style scoped>

</style>
