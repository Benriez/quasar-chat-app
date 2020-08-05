// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD1F9UrT9nOTesZ9RK07CrFhws7WIMjT5U",
  authDomain: "quasar-chat-app-53ce0.firebaseapp.com",
  databaseURL: "https://quasar-chat-app-53ce0.firebaseio.com",
  projectId: "quasar-chat-app-53ce0",
  storageBucket: "quasar-chat-app-53ce0.appspot.com",
  messagingSenderId: "1079777141647",
  appId: "1:1079777141647:web:d8b80d4278ce73b103e1fa"
};
// Initialize Firebase
let firebaseApp= firebase.initializeApp(firebaseConfig);
let firebaseAuth= firebaseApp.auth()
let firebaseDb= firebaseApp.database()

export {firebaseAuth, firebaseDb}