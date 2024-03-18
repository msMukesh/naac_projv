import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDn38qSzq8jeFqtg-WCUC_oCgqP-PSbkVA",
  authDomain: "naacauth-b08aa.firebaseapp.com",
  projectId: "naacauth-b08aa",
  storageBucket: "naacauth-b08aa.appspot.com",
  messagingSenderId: "481148945571",
  appId: "1:481148945571:web:92dc68e6d6cebeebb6eb16"
};
const app = initializeApp(firebaseConfig);export const auth = getAuth(app);
