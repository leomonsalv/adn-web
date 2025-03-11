'use client';

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { onAuthStateChanged, User, Auth } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { getFirebaseAuthUser } from '@/lib/firebaseConfig';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  accessToken: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Obtener usuario inicial del sessionStorage
    const sessionUser = getFirebaseAuthUser();
    if (sessionUser) {
      setUser(sessionUser);
      setAccessToken(sessionUser.stsTokenManager?.accessToken);
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Actualizar token y sessionStorage
        const token = await currentUser.getIdToken();
        const userData = {
          ...currentUser,
          stsTokenManager: {
            accessToken: token,
            expirationTime: Date.now() + 7200 * 1000,
          },
        };

        sessionStorage.setItem(
          `firebase:authUser:${auth.app.options.apiKey}:${auth.app.name}`,
          JSON.stringify(userData),
        );

        setUser(currentUser);
        setAccessToken(token);
      } else {
        sessionStorage.removeItem(`firebase:authUser:${auth.app.options.apiKey}:${auth.app.name}`);
        setUser(null);
        setAccessToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, accessToken }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
