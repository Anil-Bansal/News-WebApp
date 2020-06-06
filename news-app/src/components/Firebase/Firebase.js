import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDbNhjNKBuikvh9_tTGhwBwQ6XeXCFpMeo",
  authDomain: "news-fk-40403.firebaseapp.com",
  databaseURL: "https://news-fk-40403.firebaseio.com",
  projectId: "news-fk-40403",
  storageBucket: "news-fk-40403.appspot.com",
  messagingSenderId: "1007711628928",
  appId: "1:1007711628928:web:ff5ce48bc28b53fee6c065",
  measurementId: "G-XG648Q3ZWW"
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