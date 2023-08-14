// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    
    // apiKey: "AIzaSyCUyYezTAHSo3xFRXEWRPyOmEpM2D03r6k",
    // authDomain: "fir-job-portal-e7c35.firebaseapp.com",
    // projectId: "fir-job-portal-e7c35",
    // storageBucket: "fir-job-portal-e7c35.appspot.com",
    // messagingSenderId: "938738836546",
    // appId: "1:938738836546:web:194c41c428580a7e8579db"

    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket ,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;