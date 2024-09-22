// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPl-OCoaLaDqjV8DbfJbstwVBgzIY40c4",
  authDomain: "e-commerce-shiraz-1d331.firebaseapp.com",
  projectId: "e-commerce-shiraz-1d331",
  storageBucket: "e-commerce-shiraz-1d331.appspot.com",
  messagingSenderId: "798840254512",
  appId: "1:798840254512:web:84f0e9b030f9065ffdfdf5",
  measurementId: "G-ZDHQK1KK2J"
};

export const app = initializeApp(firebaseConfig);

if (typeof window !== 'undefined') {
  // Ensure analytics is only initialized in the browser
  isSupported().then((supported) => {
    if (supported) {
      const analytics = getAnalytics(app);
    }
  }).catch((error) => {
    console.error("Analytics initialization failed:", error);
  });
}