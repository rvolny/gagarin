<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="emailGroup"
                    label="Email address:"
                    label-for="emailInput"
                    description="We'll never share your email with anyone else.">
        <b-form-input id="emailInput"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>

      <b-form-group id="passwordGroup"
                    label="Your password:"
                    label-for="passwordInput">
        <b-form-input id="passwordInput"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Enter password">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

    <b-modal ref="loginFailedModal">
      <div class="d-block text-center">
        <p>Login failed</p>
      </div>
    </b-modal>

    <p>Authenticated: {{ this.isAuthenticated }}</p>

  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        form: {
          email: '',
          password: ''
        },
        show: true
      }
    },
    computed: {
      isAuthenticated: function () {
        return this.$store.getters.isAuthenticated
      }
    },
    methods: {
      onSubmit (event) {
        event.preventDefault()

        let user = {
          email: this.form.email,
          password: this.form.password
        }

        this.$store.dispatch('login', {user, requestOptions: {}}).then(() => {
          console.log('Authenticated')
        }).catch(() => {
          this.showModal()
        })
      },
      onReset: function (event) {
        event.preventDefault()

        // Reset our form values
        this.form.email = ''
        this.form.password = ''

        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => { this.show = true })
      },
      showModal () {
        this.$refs.loginFailedModal.show()
      }
    }
  }
</script>

<style scoped>

</style>
