"use client";

import { auth, firebaseAnalytics } from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/** Defines the shape of the authentication context. */
type AuthContext = {
  /** The current authentication state, either 'loading', 'no-auth', or 'auth'. */
  state: "loading" | "no-auth" | "auth";
  /** Indicates whether the authentication state is currently being loaded. */
  isLoading: boolean;
  /** Indicates whether there is an authenticated user. */
  isUser: boolean;
  /** The current Firebase user object if authenticated, otherwise null. */
  user: null | User;
};

/**
 * React context for managing authentication state.
 * Provides information about the current authentication state and the authenticated user.
 */
const AuthContext = createContext<AuthContext>({
  isLoading: true,
  state: "loading",
  isUser: false,
  user: null,
});

/**
 * Custom hook to access the authentication context.
 * @returns The current authentication context object.
 * @example
 * const auth = useAuth();
 * console.log(auth.state);
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Custom hook to access the currently authenticated user.
 * @returns The Firebase User object if authenticated, otherwise null.
 * @example
 * const user = useUser();
 * console.log(user?.displayName);
 */
export const useUser = () => useContext(AuthContext).user;

/**
 * Authentication context provider component.
 * This component initializes the Firebase authentication state listener and provides
 * the authentication context to its children.
 * @param children - React children components to be wrapped within the provider.
 * @returns The provider component with authentication context.
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [state, setState] = useState<AuthContext["state"]>("loading");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    firebaseAnalytics();
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsUser(true);
        setState("auth");
      } else {
        setState("no-auth");
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isUser,
        state,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
