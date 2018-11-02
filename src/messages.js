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
      },
      sender: {
        pageTitle: 'Register as a sender',
        labelDocumentType: 'Document type',
        selectDefaultDocumentType: 'Choose document type',
        prefixScanFront: 'Scan front side',
        labelScanFront: 'Choose file',
        prefixScanBack: 'Scan back side',
        labelScanBack: 'Choose file',
        labelAgreementCheck: 'I agree to the terms of this application.',
        buttonBecomeSender: 'Become sender',
        buttonReset: 'Reset',
        registrationSuccessTitle: 'Sender registration successful',
        registrationSuccessText: 'You are successfully registered as a sender. From now on, you can send packages.',
        registrationSuccessButton: 'OK',
        registrationFailedTitle: 'Sender registration failed',
        registrationFailedText: 'Unable to finish sender registration with provided information.',
        registrationFailedButton: 'OK'
      },
      lists: {
        documentType: {
          ID_CARD: 'Identification card',
          PASSPORT: 'Passport',
          DRIVERS_LICENCE: 'Driver\'s license'
        }
      }
    },
    validations: {
      // Reserved for veeValidate plugin
      attributes: {
        email: 'email',
        password: 'password',
        name: 'first name',
        surname: 'surname',
        passwordConfirmation: 'password',
        listDocumentTypeId: 'document type',
        scanFront: 'front side scan',
        scanBack: 'back side scan',
        agreementChecked: 'agreement with application terms'
      }
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
      },
      sender: {
        pageTitle: 'Registrácia odosielateľa',
        labelDocumentType: 'Typ dokladu',
        selectDefaultDocumentType: 'Vyberte typ dokladu',
        prefixScanFront: 'Predná strana',
        labelScanFront: 'Vyberte súbor',
        prefixScanBack: 'Zadná strana',
        labelScanBack: 'Vyberte súbor',
        labelAgreementCheck: 'Súhlasím s podmienkami aplikácie.',
        buttonBecomeSender: 'Registrovať ako odosielateľ',
        buttonReset: 'Zmazať',
        registrationSuccessTitle: 'Registrácia odosielateľa úspešná',
        registrationSuccessText: 'Zaregistrovali ste sa ako odosielateľ. Odteraz môžete posielať balíčky.',
        registrationSuccessButton: 'OK',
        registrationFailedTitle: 'Neúspešná registrácia odosielateľa',
        registrationFailedText: 'Registrácia odosielateľa s uvedenými údajmi sa nepodarila.',
        registrationFailedButton: 'OK'
      },
      lists: {
        documentType: {
          ID_CARD: 'Občiansky preukaz',
          PASSPORT: 'Pas',
          DRIVERS_LICENCE: 'Vodičský preukaz'
        }
      }
    },
    validations: {
      // Reserved for veeValidate plugin
      attributes: {
        email: 'e-mail',
        password: 'heslo',
        name: 'krstné meno',
        surname: 'priezvisko',
        passwordConfirmation: 'heslo',
        listDocumentTypeId: 'typ dokumentu',
        scanFront: 'fotka prednej strany',
        scanBack: 'fotka zadnej strany',
        agreementChecked: 'súhlas s podmienkami'
      }
    }
  }
};

export default messages;
