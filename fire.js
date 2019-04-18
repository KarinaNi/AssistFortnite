const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// You'll have to fill in the API credentials from your project
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};

firebase.initializeApp(firebaseConfig);
export default firebase