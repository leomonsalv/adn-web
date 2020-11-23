import i18next from '../../../config/i18n';
import formValidation from './formValidations';

const runTranslate = () => ({
  emailRules: [
    {
      type: 'email',
      message: i18next.t('auth.rules.validEmail')
    },
    {
      required: true,
      message: i18next.t('auth.rules.emptyEmail')
    }
  ],
  passwordRules: [{ required: true, message: i18next.t('auth.rules.password') }],
  secondPasswordRules: [
    {
      required: true,
      message: i18next.t('auth.rules.confirmPassword')
    },
    formValidation.secondPasswordValidation
  ],
  usernameRules: [
    {
      required: true,
      message: i18next.t('auth.rules.username'),
      whitespace: true
    }
  ],
  addressRules: [
    {
      required: true,
      message: i18next.t('auth.rules.address')
    }
  ],
  agreementRules: [formValidation.agreementValidation],
  phoneRules: [
    {
      required: true,
      message: i18next.t('auth.rules.phone')
    }
  ]
});

i18next.on('languageChanged', () => runTranslate());

export default runTranslate;
