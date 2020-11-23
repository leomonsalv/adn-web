import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { getToken, removeToken } from './firebase/utils/token';
import { initialState, setProfile, cleanProfile } from './stores/actions/profile';
import AuthProvider from './contexts/AuthContext/AuthContext';
import FirebaseContext from './firebase/context';
import API from './services';
import Routes from './routes/Routes';

const init = () => {
  const token = getToken();

  return token
    ? { isLogged: true, accessToken: token }
    : { isLogged: false, accessToken: '' };
};

const App = () => {
  const dispatch = useDispatch();
  const firebase = useContext(FirebaseContext);

  const { isLogged, accessToken } = init();

  dispatch(
    setProfile({
      ...initialState,
      isLogged,
      accessToken
    })
  );

  useEffect(() => {
    const initProfile = async () => {
      firebase.getAuth().onAuthStateChanged(async (user) => {
        if (user) {
          const tokenFromFirebase = await user.getIdToken();
          const sessionToken = getToken();

          if (tokenFromFirebase === sessionToken) {
            const userProfile = await firebase.getUserByEmail(user.email);

            const { data } = await API.roles.roleVerification(
              userProfile.roleId
            );

            if (data === undefined) {
              dispatch(cleanProfile());
              removeToken();
              return;
            }

            dispatch(
              setProfile({
                ...userProfile,
                isLogged: true,
                accessToken: sessionToken,
                role: data
              })
            );
          } else {
            dispatch(cleanProfile());
            removeToken();
          }
        } else {
          removeToken();
          dispatch(cleanProfile());
        }
      });
    };

    if (isLogged) {
      initProfile();
    }
  }, [isLogged, accessToken, dispatch, firebase]);

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
