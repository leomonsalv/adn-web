import reducer, {
  setProfile,
  cleanProfile,
  initialState
} from '../../stores/actions/profile';

describe('test profile slice', () => {
  const profile = {
    email: 'test@300dev.com',
    username: 'testuser',
    phone: '+0425655587',
    address: 'caracas, venezuela',
    isLogged: true,
    accessToken: '123abc',
    role: {
      role: 'administrator',
      permissions: [
        'delete-roles',
        'update-roles',
        'create-roles',
        'list-roles'
      ]
    }
  };

  it('should return initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it('should dispatch setProfile', () => {
    const nextState = reducer(initialState, setProfile(profile));
    expect(nextState).toEqual(profile);
  });

  it('should clean profile reducer', () => {
    const nextState = reducer(initialState, setProfile(profile));
    expect(nextState).toEqual(profile);

    const updatedState = reducer(nextState, cleanProfile());

    expect(updatedState).toEqual(initialState);
  });
});
