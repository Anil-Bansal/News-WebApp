import app from 'firebase/app';
import firebase from 'firebase'
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
	public realDatabase: any;
	public messageReference: any;
	public firebaseAnalytics: any;

	constructor() {
		app.initializeApp(firebaseConfig);
		this.auth=app.auth();
		this.database=app.firestore();
		this.prov = new app.auth.GoogleAuthProvider();
		this.realDatabase=firebase.database();
		this.messageReference=this.realDatabase.ref().child('messages');
		this.firebaseAnalytics=app.analytics();
	}

	//Authenticate Using Email Password (SignUp)
	doCreateUserWithEmailAndPassword =  (email: string, password: string) =>
		this.auth.createUserWithEmailAndPassword(email, password);

	//Authenticate Using Email Password(SignIn)
	doSignInWithEmailAndPassword = (email: string, password: string) =>
		this.auth.signInWithEmailAndPassword(email, password);

	//Guest Authentication
	doGuestSignIn = () =>
		this.auth.signInAnonymously()

	//Google Authentication
	doGoogleSignIn = () =>
		this.auth.signInWithPopup(this.prov)

	//Add UserName to Database
	addName = (name: string) =>{
		var user = this.auth.currentUser;
		user.updateProfile({
			displayName: name
		})
	}

	//Get UserName from Database
	async getUserName(setName: Function){
		const user= await this.auth.currentUser;
		user.providerData.forEach(function (profile: any) {
			setName(profile.displayName)
		});
	}
	
	//Get User Id
	getUID = () =>{
		const user=this.auth.currentUser
		return user.uid
	}

	//Sign Out
	doSignOut = () => {
		this.auth.signOut();
	}

	//Add Cookies and Liked Data to Database
	addCookieToDatabase = (uid: string,cookie: Array<string>=[],data: Array<NewsPost>=[]) =>{
		this.database.collection('users').doc(uid).set({
			cookie: cookie,
			data: data
		})
	}

	//Add New User to Database and set Initial values
	addNewUser=(uid: string)=>{
		this.database.collection("users").doc(uid).set({
			cookie: [],
			data: []
		})
	}

	//Get User Liked Data from Database
	async getCookieFromDatabase(uid: string)
	{
		var curdoc = await this.database.collection("users").doc(uid).get()
		if(curdoc.exists)
			return Promise.resolve(curdoc.data().cookie);
		else
			return Promise.resolve([])
	}

	//Get Liked Post Data from Database
	async getDataFromDatabase(uid: string)
	{
		var curdoc = await this.database.collection("users").doc(uid).get()
		if(curdoc.exists)
			return Promise.resolve([...curdoc.data().data]);
		else
			return Promise.resolve([])
	}

	//Send Message and Add to database
	sendMessage(message: string,name: string) {
		if (message) {
			var newMessage = {
				userName: name,
				message: message,
			}
			this.messageReference.push(newMessage);
		}
	}

	//Add Event to Analytics
	addEvent(event: string,parameter?: Object){
		this.firebaseAnalytics.logEvent(event,parameter);
	}
}

export default Firebase;