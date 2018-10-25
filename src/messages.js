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
        loginFailedButton: 'OK',
        notMember: 'Not a member?',
        register: 'Sign up'
      },
      registration: {
        pageTitle: 'Sign up',
        labelName: 'Your name',
        labelSurname: 'Your surname',
        labelEmail: 'Your email',
        labelPassword: 'Your password',
        labelPasswordConfirmation: 'Confirm your password',
        buttonRegister: 'Register',
        buttonReset: 'Reset',
        registrationSuccessTitle: 'Registration successful',
        registrationSuccessText: 'Please check your mailbox to verify your email account.',
        registrationSuccessButton: 'OK',
        registrationFailedTitle: 'Registration failed',
        registrationFailedText: 'Unable to finish registration with provided information.',
        registrationFailedButton: 'OK'
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
        loginFailedButton: 'OK',
        notMember: 'Nemáte účet?',
        register: 'Zaregistrujte sa'
      },
      registration: {
        pageTitle: 'Registrácia',
        labelName: 'Vaše krstné meno',
        labelSurname: 'Vaše priezvisko',
        labelEmail: 'Vaša e-mailová adresa',
        labelPassword: 'Vaše heslo',
        labelPasswordConfirmation: 'Potvrďte vaše heslo',
        buttonRegister: 'Zaregistrovať',
        buttonReset: 'Zmazať',
        registrationSuccessTitle: 'Registrácia úspešná',
        registrationSuccessText: 'Choďte, prosím, do svojej e-mailovej schránky a overte e-mailovú adresu.',
        registrationSuccessButton: 'OK',
        registrationFailedTitle: 'Neúspešná registrácia',
        registrationFailedText: 'Registrácia s uvedenými údajmi sa nepodarila.',
        registrationFailedButton: 'OK'
      }
    },
    validations: {
      // Reserved for veeValidate plugin
      attributes: {
        email: 'e-mail',
        password: 'heslo',
        name: 'krstné meno',
        surname: 'priezvisko',
        passwordConfirmation: 'heslo'
      }
    }
  }
};

export default messages;
