import reducer, {
  setProfile,
  cleanProfile,
  initialState
} from '../../stores/actions/profile';

describe('test profile slice', () => {
  const profile = {
    email: 'test@300dev.com',
    name: 'Nombre',
    dni: 'V1234567',
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
    },
    favorites: ['123', '456'],
    password: '323232'
  };

  const initialProfile = {
    name: '',
    dni: '',
    email: '',
    username: '',
    phone: '',
    address: '',
    role: {},
    isLogged: false,
    accessToken: '',
    docId: '',
    favorites: [],
    password: '',
  };
  it('should return initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialProfile);
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
