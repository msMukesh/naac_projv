import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";


// Create the user context
export const UserContext = createContext({});

// Custom hook to use the user context
export const useUserContext = () => {
  return useContext(UserContext);
};

// Provider component for the user context
export const UserContextProvider = ({ children }) => {
  // State variables
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Effect to handle authentication state changes
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the user in the state
      setLoading(false); // Update loading state
      setError(""); // Clear any previous errors
    });
    return () => unsubscribe(); // Cleanup function
  }, []);

  // Function to register a new user
  const registerUser = async (email, password, name) => {
    setLoading(true); // Set loading to true while processing
    try {
      // Create user with email and password
      console.log(auth+email+password);
      await createUserWithEmailAndPassword(auth, email, password);
      // Update user profile with the provided name
      await updateProfile(auth.currentUser, { displayName: name });
      console.log("User registered successfully");

    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to sign in user with email and password
  const signInUser = async (email, password) => {
    setLoading(true); // Set loading to true while processing
    try {
      // Sign in user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully");
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to sign out the user
  const logoutUser = () => {
    signOut(auth); // Sign out the user
  };

  // Function to sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true); // Set loading to true while processing
    setError(""); // Clear any previous errors
    try {
      // Sign in with Google popup
      await signInWithPopup(auth, new GoogleAuthProvider());
      console.log("User signed in with Google successfully");
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to send password reset email
  const forgotPassword = async (email) => {
    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully");
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  // Value object to be provided by the context
  const contextValue = {
    user,
    loading,
    error,
    signInUser,
    registerUser,
    logoutUser,
    forgotPassword,
    signInWithGoogle,
  };

 // Inside UserContextProvider component
 return (
  <UserContext.Provider value={contextValue}>
    {children}
  </UserContext.Provider>
);
};
