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
      courier: {
        pageTitle: 'Register as a courier',
        labelDocumentType: 'Document type',
        selectDefaultDocumentType: 'Choose document type',
        prefixScanFront: 'Scan front side',
        labelScanFront: 'Choose file',
        prefixScanBack: 'Scan back side',
        labelScanBack: 'Choose file',
        labelAgreementCheck: 'I agree to the terms of this application.',
        buttonBecomeSender: 'Become courier',
        buttonReset: 'Reset',
        registrationSuccessTitle: 'Courier registration successful',
        registrationSuccessText: 'You are successfully registered as a courier. From now on, you can deliver packages.',
        registrationSuccessButton: 'OK',
        registrationFailedTitle: 'Courier registration failed',
        registrationFailedText: 'Unable to finish courier registration with provided information.',
        registrationFailedButton: 'OK'
      },
      package: {
        pageTitle: 'Send a package',
        blockPackage: 'Package',
        blockPickup: 'Pickup',
        blockDelivery: 'Delivery',
        blockPrice: 'Price',
        blockOther: 'Miscellaneous',
        labelContents: 'Package contents',
        labelPackageType: 'Package type',
        selectDefaultPackageType: 'Choose package type',
        labelPickupLocation: 'Pickup location',
        labelPickupDate: 'Pickup date',
        labelPickupTime: 'Pickup time',
        labelPickupNote: 'Pickup note',
        labelDeliveryLocation: 'Delivery location',
        labelDeliveryDate: 'Delivery date',
        labelDeliveryTime: 'Delivery time',
        labelDeliveryNote: 'Delivery note',
        labelPrice: 'Delivery price',
        labelPriceMaxIncrease: 'Maximum price increase',
        labelInsuranceRange: 'Insurance',
        selectDefaultInsuranceRange: 'Choose insurance range',
        labelAlternativeContact: 'Alternative contact',
        labelPassword: 'Delivery password',
        placeholderTime: 'Select time',
        buttonSend: 'Send package',
        buttonReset: 'Reset',
        packageCreationSuccessTitle: 'Package successfully created',
        packageCreationSuccessText: 'Your package was registered and is waiting for a courier. After courier is found, you will discuss details and the package will be delivered.',
        packageCreationSuccessButton: 'OK',
        packageCreationFailedTitle: 'Package was not created',
        packageCreationFailedText: 'We were unable to create your package because of technical error. Please try again later.',
        packageCreationFailedButton: 'OK'
      },
      lists: {
        documentType: {
          ID_CARD: 'Identification card',
          PASSPORT: 'Passport',
          DRIVERS_LICENCE: 'Driver\'s license'
        },
        packageType: {
          PACKAGE_SMALL: 'Small package',
          PACKAGE_MEDIUM: 'Medium package',
          PACKAGE_LARGE: 'Large package',
          ENVELOPE_A4: 'Envelope A4',
          ENVELOPE_A5: 'Envelope A5'
        },
        insuranceRange: {
          'none': 'none',
          'upto25': 'Up to 25 EUR',
          'upto50': 'Up to 50 EUR',
          'over50': 'Over 50 EUR'
        }
      },
      calendar: {
        month: {
          0: 'January',
          1: 'February',
          2: 'March',
          3: 'April',
          4: 'May',
          5: 'June',
          6: 'July',
          7: 'August',
          8: 'September',
          9: 'October',
          10: 'November',
          11: 'December'
        },
        week: {
          0: 'Mo',
          1: 'Tu',
          2: 'We',
          3: 'Th',
          4: 'Fr',
          5: 'Sa',
          6: 'Su'
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
        listPackageTypeId: 'package type',
        listInsuranceRangeId: 'insurance level',
        scanFront: 'front side scan',
        scanBack: 'back side scan',
        agreementChecked: 'agreement with application terms',
        contents: 'contents',
        pickupLocation: 'pickup location',
        deliveryLocation: 'delivery location',
        price: 'price',
        priceMaxIncrease: 'price increase'
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
      courier: {
        pageTitle: 'Registrácia kuriéra',
        labelDocumentType: 'Typ dokladu',
        selectDefaultDocumentType: 'Vyberte typ dokladu',
        prefixScanFront: 'Predná strana',
        labelScanFront: 'Vyberte súbor',
        prefixScanBack: 'Zadná strana',
        labelScanBack: 'Vyberte súbor',
        labelAgreementCheck: 'Súhlasím s podmienkami aplikácie.',
        buttonBecomeSender: 'Registrovať ako kuriér',
        buttonReset: 'Zmazať',
        registrationSuccessTitle: 'Registrácia kuriéra úspešná',
        registrationSuccessText: 'Zaregistrovali ste sa ako kuriér. Odteraz môžete doručovať balíčky.',
        registrationSuccessButton: 'OK',
        registrationFailedTitle: 'Neúspešná registrácia kuriéra',
        registrationFailedText: 'Registrácia kuriéra s uvedenými údajmi sa nepodarila.',
        registrationFailedButton: 'OK'
      },
      package: {
        pageTitle: 'Zaslanie balíčka',
        blockPackage: 'Balíček',
        blockPickup: 'Odoslanie',
        blockDelivery: 'Doručenie',
        blockPrice: 'Cena',
        blockOther: 'Ostatné',
        labelContents: 'Obsah balíčka',
        labelPackageType: 'Veľkosť balíčka',
        selectDefaultPackageType: 'Vyberte typ balíčka',
        labelPickupLocation: 'Miesto vyzdvihnutia',
        labelPickupDate: 'Dátum vyzdvihnutia',
        labelPickupTime: 'Čas vyzdvihnutia',
        labelPickupNote: 'Poznámka ku vyzdvihnutiu',
        labelDeliveryLocation: 'Miesto doručenia',
        labelDeliveryDate: 'Dátum doručenia',
        labelDeliveryTime: 'Čas doručenia',
        labelDeliveryNote: 'Poznámka k doručeniu',
        labelPrice: 'Cena za doručenie',
        labelPriceMaxIncrease: 'Maximálne navýšenie ceny',
        labelInsuranceRange: 'Poistenie',
        selectDefaultInsuranceRange: 'Vyberte poistenie',
        labelAlternativeContact: 'Alternatívny kontakt',
        labelPassword: 'Heslo pre doručenie',
        placeholderTime: 'Vyberte čas',
        buttonSend: 'Poslať balíček',
        buttonReset: 'Zmazať',
        packageCreationSuccessTitle: 'Balíček bol úspešne vytvorený',
        packageCreationSuccessText: 'Váš balíček bol zaregistrovaný a čaká na kuriéra. Po nájdení kuriéra si dohodnete detaily a balíček bude doručený adresátovi.',
        packageCreationSuccessButton: 'OK',
        packageCreationFailedTitle: 'Balíček sa nepodarilo vytvoriť',
        packageCreationFailedText: 'Balíček sa nepodarilo vytvoriť kvôli technickej chybe. Skúste to o chvíľu.',
        packageCreationFailedButton: 'OK'
      },
      lists: {
        documentType: {
          ID_CARD: 'Občiansky preukaz',
          PASSPORT: 'Pas',
          DRIVERS_LICENCE: 'Vodičský preukaz'
        },
        packageType: {
          PACKAGE_SMALL: 'Malý balíček',
          PACKAGE_MEDIUM: 'Stredný balík',
          PACKAGE_LARGE: 'Veľký balík',
          ENVELOPE_A4: 'Obálka A4',
          ENVELOPE_A5: 'Obálka A5'
        },
        insuranceRange: {
          'none': 'žiadne',
          'upto25': 'Do 25 EUR',
          'upto50': 'Do 50 EUR',
          'over50': 'Nad 50 EUR'
        }
      },
      calendar: {
        month: {
          0: 'Január',
          1: 'Február',
          2: 'Marec',
          3: 'Apríl',
          4: 'Máj',
          5: 'Jún',
          6: 'Júl',
          7: 'August',
          8: 'September',
          9: 'Október',
          10: 'November',
          11: 'December'
        },
        week: {
          0: 'Po',
          1: 'Ut',
          2: 'St',
          3: 'Št',
          4: 'Pi',
          5: 'So',
          6: 'Ne'
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
        listPackageTypeId: 'veľkosť balíčka',
        listInsuranceRangeId: 'výška poistenia',
        scanFront: 'fotka prednej strany',
        scanBack: 'fotka zadnej strany',
        agreementChecked: 'súhlas s podmienkami',
        contents: 'obsah',
        pickupLocation: 'miesto vyzdvihnutia',
        deliveryLocation: 'miesto doručenia',
        price: 'cena',
        priceMaxIncrease: 'navýšenie ceny'
      }
    }
  }
};

export default messages;
