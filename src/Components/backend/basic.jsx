import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAgSbVrRgXh0K4_dSvtLbP9ufz9MaWjgvo",
  authDomain: "solkeyfi.firebaseapp.com",
  projectId: "solkeyfi",
  storageBucket: "solkeyfi.appspot.com",
  messagingSenderId: "813603260129",
  appId: "1:813603260129:web:cff041a081f0598b6259a0",
  measurementId: "G-HJ87LYRQ2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Instance
const db = getFirestore(app);

export const getClusters = async () => {
    let output = [];
    const querySnapshot = await getDocs(collection(db, "clusters"));
    querySnapshot.forEach((doc) => {
      output.push(doc.data());
    });
    return output;
}





