const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDgH5mSmcCw2wQOHKZSL24ZST11UqKowB0",
    authDomain: "assistant-for-fortnite.firebaseapp.com",
    databaseURL: "https://assistant-for-fortnite.firebaseio.com",
    projectId: "assistant-for-fortnite",
    storageBucket: "assistant-for-fortnite.appspot.com",
    messagingSenderId: "1079582520882"
};

firebase.initializeApp(firebaseConfig);
export default firebase
