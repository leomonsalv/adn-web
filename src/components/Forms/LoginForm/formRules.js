import i18next from '../../../config/i18n';

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
  passwordRules: [{ required: true, message: i18next.t('auth.rules.password') }]
});

i18next.on('languageChanged', () => runTranslate());

export default runTranslate;
