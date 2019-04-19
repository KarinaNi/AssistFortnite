require('dotenv').config()
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// You'll have to fill in the API credentials from your project
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};

firebase.initializeApp(firebaseConfig);
export default firebase