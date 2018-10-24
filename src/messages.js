// Ready translated locale messages for VueI18n
const messages = {
  en: {
    message: {
      welcome: 'Welcome',
      auth: {
        pageTitle: 'Sign in',
        labelEmail: 'Your email',
        labelPassword: 'Your password',
        buttonLogin: 'Login',
        buttonReset: 'Reset',
        loginFailedTitle: 'Login failed',
        loginFailedText: 'Unable to log you in with provided credentials.',
        loginFailedButton: 'OK'
      }
    },
    validations: {
      // Reserved for veeValidate plugin
    }
  },
  sk: {
    message: {
      welcome: 'Vitajte',
      auth: {
        pageTitle: 'Prihlásenie',
        labelEmail: 'Vaša e-mailová adresa',
        labelPassword: 'Vaše heslo',
        buttonLogin: 'Prihlásiť',
        buttonReset: 'Zmazať',
        loginFailedTitle: 'Neúspešné prihlásenie',
        loginFailedText: 'Prihlásenie s uvedeným e-mailom a heslom sa nepodarilo.',
        loginFailedButton: 'OK'
      }
    },
    validations: {
      // Reserved for veeValidate plugin
      attributes: {
        email: 'e-mail',
        password: 'heslo'
      }
    }
  }
};

export default messages;
