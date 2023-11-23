
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCPeJQxyXYvlfXAIp7EEkN7QUXdCDxO2rg",
    authDomain: "bgstyle-6a7b4.firebaseapp.com",
    projectId: "bgstyle-6a7b4",
    storageBucket: "bgstyle-6a7b4.appspot.com",
    messagingSenderId: "772410645299",
    appId: "1:772410645299:web:22738627cefaf3f1c97c46"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);