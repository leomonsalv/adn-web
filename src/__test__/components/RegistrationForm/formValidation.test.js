import formValidations from '../../../components/Forms/RegistrationForm/formValidations';

describe('Registration Form Validations', () => {
  it('Should throw an error, no match passwords', () => {
    const getFieldMock = jest.fn((field = 'password') => field);
    return formValidations
      .secondPasswordValidation({
        getFieldValue: getFieldMock
      })
      .validator('password1')
      .catch((error) => expect(error).toMatch(
        'The two passwords that you entered do not match!'
      ));
  });
});
