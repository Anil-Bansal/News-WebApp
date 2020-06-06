import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBMaY68-cCUJVGn9U_waEydkzQrAl1Xc1M",
    authDomain: "news-app-21a45.firebaseapp.com",
    databaseURL: "https://news-app-21a45.firebaseio.com",
    projectId: "news-app-21a45",
    storageBucket: "news-app-21a45.appspot.com",
    messagingSenderId: "570938653373",
    appId: "1:570938653373:web:f22ce001cfb58a5e3595d4",
    measurementId: "G-4HVVFZVBF3"
};

class Firebase {
    constructor() {
      app.initializeApp(firebaseConfig);
      this.auth=app.auth();
      this.database=app.firestore();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    addCookieToDatabase = () =>
    {
      this.database.collection('users').doc('user1').set({
        name: 'vinayak',
        // cookie: ['firsr','second']
      }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    }

    getDatabase = () =>
    {
    this.database.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
      });
      });
    }

}
   
export default Firebase;