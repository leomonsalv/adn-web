import reducer, {
  loginAttempt,
  registerAttempt,
  registerSuccess,
  registerFaillure,
  initialState,
  loginSuccess,
  loginFaillure
} from '../../stores/actions/auth';

describe('Auth Reducer/Actions', () => {
  const email = 'johndoe@gmail.com';
  const uid = 'Some valid uid';
  const name = 'John Doe';

  const errorMessage = 'Some error message';

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        user: undefined,
        login:
                  {
                    loading: false,
                    errors: undefined,
                  },
        register:
                  {
                    loading: false,
                    errors: undefined,
                  },
        restorePassword:
                  {
                    loading: false,
                    errors: undefined
                  }
      }
    );
  });
  it('Should properly start the login', () => {
    // Arrange

    // Act
    const nextState = reducer(initialState, loginAttempt());

    // Assert
    const rootState = { auth: nextState };
    expect(rootState.auth.user).toEqual(undefined);
    expect(rootState.auth.login).toEqual({ loading: true, errors: undefined });
  });

  it('should set the user data in the reducer', () => {
    const responsePayload = {
      email,
      uid,
      name,
    };
    const nextState = reducer(initialState, loginSuccess(responsePayload));

    // Assert
    const rootState = { auth: nextState };
    expect(rootState.auth.user).toEqual({
      email,
      uid,
      name,
    });
    expect(rootState.auth.login).toEqual({ loading: false, errors: undefined });
  });

  it('should set error on login', () => {
    const responsePayload = {
      message: errorMessage
    };
    const nextState = reducer(initialState, loginFaillure(responsePayload));

    // Assert
    const rootState = { auth: nextState };
    expect(rootState.auth.user).toEqual(undefined);
    expect(rootState.auth.login).toEqual({
      loading: false,
      errors: {
        message: errorMessage
      }
    });
  });

  it('Should properly start the register', () => {
    // Arrange

    // Act
    const nextState = reducer(initialState, registerAttempt());

    // Assert
    const rootState = { auth: nextState };
    expect(rootState.auth.user).toEqual(undefined);
    expect(rootState.auth.register).toEqual({ loading: true, errors: undefined });
  });

  it('should set the user data in the reducer after Register', () => {
    const responsePayload = {
      email,
      uid,
      name,
    };
    const nextState = reducer(initialState, registerSuccess(responsePayload));

    // Assert
    const rootState = { auth: nextState };
    expect(rootState.auth.user).toEqual({
      email,
      uid,
      name,
    });
    expect(rootState.auth.register).toEqual({ loading: false, errors: undefined });
  });

  it('should set the register error', () => {
    const responsePayload = {
      message: errorMessage
    };
    const nextState = reducer(initialState, registerFaillure(responsePayload));

    // Assert
    const rootState = { auth: nextState };
    expect(rootState.auth.user).toEqual(undefined);
    expect(rootState.auth.register).toEqual({
      loading: false,
      errors: {
        message: errorMessage
      }
    });
  });
});
