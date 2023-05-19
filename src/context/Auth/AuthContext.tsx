import { useRouter } from 'next/navigation';
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react';

import { onAuthStateChanged, signOut } from 'firebase/auth';

import { auth } from '@/firebase';
import { googleProvider } from '@/firebase/providers';
import {
  checkUserDocExists,
  createCredentialsUser,
  createEmptyUserDoc,
  signInCredentials,
  signInPopup
} from '@/util/user';
import { initialActionsState, initialState, reducer } from './state';
import { ActionsState } from './types';
import { useAuthState } from '@/hooks/useAuthState';

const AuthContext = createContext(initialState);
const AuthActionsContext = createContext(initialActionsState);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, actionsState, dispatch] = useAuthState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      else dispatch({ type: 'LOGOUT_SUCCESS' });
    });
    
    return unsubscribe;
  }, [dispatch]);

  return (
    <AuthContext.Provider value={state}>
      <AuthActionsContext.Provider value={actionsState}>
        {children}
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useAuthActions = () => useContext(AuthActionsContext);
