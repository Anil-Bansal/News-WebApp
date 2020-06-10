import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { NewsPost } from '../Card/Post';

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
	  public auth: any;
	  public database: any;
	  public prov: any;

    constructor() {
      app.initializeApp(firebaseConfig);
      this.auth=app.auth();
      this.database=app.firestore();
      this.prov = new app.auth.GoogleAuthProvider();
    }

    doCreateUserWithEmailAndPassword = (name: string, email: string, password: string) =>{
      console.log(name,email,password);
      this.auth.createUserWithEmailAndPassword(email, password);
      var user=this.auth.currentUser;
      user.updateProfile({displayName: name})
    }

    doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doGuestSignIn = () =>
    this.auth.signInAnonymously()

    doGoogleSignIn = () =>
      this.auth.signInWithPopup(this.prov)

    getUID = () =>{
      const user=this.auth.currentUser
      return user.uid
    }

    doSignOut = () => {
      this.auth.signOut();
    }

    addCookieToDatabase = (uid: string,cookie: Array<string>=[],data: Array<NewsPost>=[]) =>
    {
      this.database.collection('users').doc(uid).set({
        cookie: cookie,
        data: data
      })
    }

    addNewUser=(uid: string)=>{
      this.database.collection("users").doc(uid).set({
        cookie: [],
        data: []
      })
    }

    async getCookieFromDatabase(uid: string)
    {
      var curdoc = await this.database.collection("users").doc(uid).get()
      if(curdoc.exists)
        return Promise.resolve(curdoc.data().cookie);
      else
        return Promise.resolve([])
    }

    async getDataFromDatabase(uid: string)
    {
      var curdoc = await this.database.collection("users").doc(uid).get()
      if(curdoc.exists)
        return Promise.resolve([...curdoc.data().data]);
      else
        return Promise.resolve([])
    }
}

  
export default Firebase;