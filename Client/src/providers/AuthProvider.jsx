import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import { app } from "../firebase/Firebase.config";
import { useAxiosPublic } from "../hooks/useAxiosPublic";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const axiosPublic = useAxiosPublic();

  // Create user with email/password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in with email/password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      // Try popup first
      try {
        const result = await signInWithPopup(auth, googleProvider);
        return result;
      } catch (popupError) {
        // If popup fails, try redirect
        if (popupError.code === 'auth/popup-blocked' || 
            popupError.code === 'auth/cancelled-popup-request') {
          await signInWithRedirect(auth, googleProvider);
          const result = await getRedirectResult(auth);
          return result;
        }
        throw popupError;
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // logOut
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      await axiosPublic.get("/logOut", { withCredentials: true });
    } catch (err) {
      console.error("logOut failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Update Firebase profile
  const updateUserProfile = async (name, photo) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Track user state + JWT setup
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        await axiosPublic.post(
          "/jwt",
          { email: currentUser.email },
          { withCredentials: true }
        );
      } else {
        setUser(null);
        await axiosPublic.get("/logOut", { withCredentials: true });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    role,
    setRole,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    setUser,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
