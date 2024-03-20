import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn38qSzq8jeFqtg-WCUC_oCgqP-PSbkVA",
  authDomain: "naacauth-b08aa.firebaseapp.com",
  projectId: "naacauth-b08aa",
  storageBucket: "naacauth-b08aa.appspot.com",
  messagingSenderId: "481148945571",
  appId: "1:481148945571:web:92dc68e6d6cebeebb6eb16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
