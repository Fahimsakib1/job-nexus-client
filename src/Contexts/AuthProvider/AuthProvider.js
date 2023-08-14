import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../../Firebase/Firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const providerGoogle = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password); 
    }

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true);
        // localStorage.removeItem('JobPortalToken');
        return signOut(auth);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, providerGoogle);
    }

    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo)
    }

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("Current User From Auth Provider", currentUser);
            setUser(currentUser);
            setLoading(false)
        })
        return () => unsubscribe();
    }, [])




    const AuthInfo = { user, loading, setLoading, createUser, userLogin, signOutUser, updateUser, googleSignIn, resetPassword}



    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;