import firebase from 'firebase/compat'

const firebaseConfig = {
    apiKey: "AIzaSyBtVuIRtFB33xV5f9oTTmo0TlQ1vlCa12w",
    authDomain: "whats-app-clone-7f1f1.firebaseapp.com",
    projectId: "whats-app-clone-7f1f1",
    storageBucket: "whats-app-clone-7f1f1.appspot.com",
    messagingSenderId: "634588105861",
    appId: "1:634588105861:web:735a6edfdeb2b98a5d6dec"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {
    auth, provider
}

export default db