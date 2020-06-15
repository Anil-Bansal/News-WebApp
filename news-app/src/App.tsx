import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import * as actiontypes from './components/Redux/Actions';
import {fetchNews} from './components/NewsFetch/Fetch'
import Main from './components/MainBody/Main'
import {BrowserRouter,Link,Route, Switch,} from 'react-router-dom';
import Sources from './components/Sources/Sources';
import Info from './components/TeamPage/TeamInfo';
import { withCookies} from 'react-cookie';
import SignUpPage from './components/Auth/SignUpPage'
import  SignInPage from './components/Auth/SignInPage';
import Profile from './components/UserPage/Profile'
import {withFirebase} from './components/Firebase';
import { StateTypes } from './components/Redux/Reducers';
import { NewsPost } from './components/Card/Post';

interface Cookie{
	get: Function,
	set: Function
}

interface Props{
	setUserId: Function,
	firebase: any,
	cookies: Cookie,
	setCookieLoad: Function,
	setLoginStatus: Function,
	setName: Function,
	isLoggedIn: boolean,
	setLiked: Function
}

class App extends Component<Props>{
	public fetchNews: any;
	public props: Props;

	constructor(props: Props){
		super(props);
		this.fetchNews=fetchNews.bind(this);
	}

	async signInSync (uid: string)
	{
		this.props.setUserId(uid);
		var cookies: Array<string> = await this.props.firebase.getCookieFromDatabase(uid)
		this.props.cookies.set('testing',cookies,{path: '/'});
		this.props.setCookieLoad(true);
		this.props.cookies.set('User',uid);
		this.props.setLoginStatus(true);
		var name: string=await this.props.cookies.get('Name');
		this.props.setName(name);
		await this.props.firebase.getDataFromDatabase(uid)
			.then((result:any)=>{
				this.props.setLiked(result);
			})
	}

	async checkPrevLogin(){
		var uid=await this.props.cookies.get('User');
		var name=await this.props.cookies.get('Name');
		if(uid && uid!=='None'){
			if(name==='Anonymous') {this.props.setAnonymous(true);}
			this.signInSync(uid);
		}
		if(!uid){
			this.props.cookies.set('User','None',{path: '/'})
		}
	}

	componentDidMount(){
		this.checkPrevLogin();
	}

	render(){
		return(
			<BrowserRouter>
			<div className='App'>
				<div className='Top'>
					<Link to="/" className='Route'>SignUp  </Link>
					<Link to="/SignIn" className='Route'>Sign In</Link>
					<Link to="/Main" className='Route'>NewsFetch</Link>
					<Link to="/Sources" className='Route'>Sources</Link>
					<Link to="/Team" className='Route'>Team Info</Link>
					<Link to="/Profile" className='Route'>Favourites</Link>
				</div>
					<Switch>
						<Route exact path="/" render={() => (<SignUpPage cookies={this.props.cookies}/>)}/>
						<Route exact path="/SignIn" render={() => (<SignInPage cookies={this.props.cookies}/>)}/>
						{this.props.isLoggedIn && (
							<div>
								<Route exact path="/Main" render={() => (<Main cookies={this.props.cookies}/>)}/>
								<Route exact path="/Sources" render={() => (<Sources cookies={this.props.cookies}/>)}/>
								<Route exact path="/Team" component={Info}/>
								<Route exact path="/Profile" render={() => (<Profile content='likedOnly' 
																					cookies={this.props.cookies}/> )}/>
							</div>)} 
					</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

const mapStateToProps=(state: StateTypes)=>{
	return{
		isLoading: state.isLoading,
		page: state.page,
		country: state.country ,
		articles: state.articles,
		newsEnd: state.newsEnd,
		errorExist: state.errorExist,
		isLoggedIn: state.isLoggedIn
	};
}

const mapDispatchToProps=(dispatch: any)=>{
	return{
		setLoading: (val: boolean)=>dispatch(actiontypes.setLoading(val)),
		setNewsEnd: (val: boolean)=>dispatch(actiontypes.setNewsEnd(val)),
		setErrorExist: (val: boolean)=>dispatch(actiontypes.setErrorExist(val)),
		setCountry: (val: string)=>dispatch(actiontypes.setCountry(val)),
		setPage: (val: number)=>dispatch(actiontypes.setPage(val)),
		setLoginStatus: (val: boolean)=>dispatch(actiontypes.setLoginStatus(val)),
		setUserId: (val: string)=>dispatch(actiontypes.setUserId(val)),
		setCookieLoad: (val: boolean)=>dispatch(actiontypes.setCookieLoad(val)),
		setName: (val: string)=>dispatch(actiontypes.setName(val)),
		setLiked: (val: Array<NewsPost>) =>dispatch(actiontypes.setLiked(val)),
		setAnonymous: (val: boolean) =>dispatch(actiontypes.setAnonymous(val))		
	};
}

export default withCookies(connect(mapStateToProps,mapDispatchToProps)((withFirebase(App))));
