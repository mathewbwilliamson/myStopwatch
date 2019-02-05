import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCTPHPqxKtKRUKf1_ygxZmycD2WlZvPHks",
    authDomain: "catch-of-the-day-matt-f53f9.firebaseapp.com",
    databaseURL: "https://mystopwatchtracker.firebaseio.com/",
    projectId: "mystopwatchtracker",
    // storageBucket: "catch-of-the-day-matt-f53f9.appspot.com",
    messagingSenderId: "906033198506"
  })

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base