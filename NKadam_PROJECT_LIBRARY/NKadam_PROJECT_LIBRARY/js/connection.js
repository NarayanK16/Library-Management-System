//initializing firebase app and connecting database

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA09joPwgvINUeuow-ugo9EKf8aAEwXcmo",
  authDomain: "librarymanagement-d8fcc.firebaseapp.com",
  databaseURL:"https://librarymanagement-d8fcc-default-rtdb.firebaseio.com",
  projectId: "librarymanagement-d8fcc",
  storageBucket: "librarymanagement-d8fcc.appspot.com",
  messagingSenderId: "674962242887",
  appId: "1:674962242887:web:ad7a4e62d065fdeb43e062",
  measurementId: "G-08D8TJW968"
};

firebase.initializeApp(firebaseConfig);
var authObj = firebase.auth();

	
