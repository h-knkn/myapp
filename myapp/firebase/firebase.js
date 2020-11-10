import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAA--43PUdsRiahK2Aa5LpXbujGm0qpR9A",
    authDomain: "my-react-babyapp.firebaseapp.com",
    databaseURL: "https://my-react-babyapp.firebaseio.com",
    projectId: "my-react-babyapp",
    storageBucket: "my-react-babyapp.appspot.com",
    messagingSenderId: "478988653951",
    appId: "1:478988653951:web:4c4c8b804d3f3957a9b64a",
    measurementId: "G-DBJZMM8BYK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();

export default firebase;