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

    getUID = () =>{
      const user=this.auth.currentUser
      return user.uid
    }

    doSignOut = () => this.auth.signOut();

    addCookieToDatabase = (uid,cookie=[]) =>
    {
      this.database.collection('users').doc(uid).set({
        cookie: cookie
      })
    }

    addNewUser=(uid)=>{
      console.log(uid);
      this.database.collection("users").doc(uid).set({
        cookie: []
      })
    }

    getCookieFromDatabase=(uid)=>{
      this.database.collection("users").doc(uid).get()
      .then((curdoc)=>{
        console.log(curdoc.data().cookie)
        return curdoc.data().cookie;
      })
    }

}

  
export default Firebase;