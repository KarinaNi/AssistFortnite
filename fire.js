const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

import * as config from './FirebaseConfig'
// You'll have to fill in the API credentials from your project
const firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DB_URL,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID
};

firebase.initializeApp(firebaseConfig);
export default firebase