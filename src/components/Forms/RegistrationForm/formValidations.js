const secondPasswordValidation = ({ getFieldValue }) => ({
  validator(rule, value) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }

    return Promise.reject(
      new Error('The two passwords that you entered do not match!')
    );
  }
});

const agreementValidation = () => ({
  validator: (_, value) => (value
    ? Promise.resolve()
    : Promise.reject(new Error('Should accept agreement')))
});

export default { secondPasswordValidation, agreementValidation };
