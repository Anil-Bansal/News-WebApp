import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import * as actiontypes from './components/Redux/Actions';
import {fetchNews} from './components/NewsFetch/Fetch'
import Main from './components/MainBody/Main'
import {BrowserRouter,Link,Route, Switch, Redirect} from 'react-router-dom';
import Sources from './components/Sources/Sources';
import Info from './components/TeamPage/TeamInfo';
import { withCookies } from 'react-cookie';
import SignUpPage from './components/Auth/SignUpPage'
import  SignInPage from './components/Auth/SignInPage';
import Profile from './components/UserPage/Profile'
import ChatBox from './components/Chat/ChatBox';
import {withFirebase} from './components/Firebase';


class App extends Component{
	public fetchNews: any;
	public props: any;

  constructor(props){
    super(props);
    this.fetchNews=fetchNews.bind(this);
  }

  async signInSync (uid)
  {
      this.props.setUserId(uid);
      var cookies: Array<string> = await this.props.firebase.getCookieFromDatabase(uid)
      this.props.cookies.set('testing',cookies,{path: '/'});
      this.props.setCookieLoad(true);
      this.props.cookies.set('User',uid);
      this.props.setLoginStatus(true);
  }

  async checkPrevLogin(){
    var uid=await this.props.cookies.get('User');
    if(uid!=='None'){
      console.log("Hi", uid);
      this.signInSync(uid);
    }
  }

  componentDidMount(){
    this.checkPrevLogin();
  }

  render(){
    return(
      <BrowserRouter>
      <div>
        <div className='Top'>
          <Link to="/" className='Route'>SignUp  </Link>
          <Link to="/SignIn" className='Route'>Sign In</Link>
          <Link to="/Main" className='Route'>NewsFetch</Link>
          <Link to="/Sources" className='Route'>Sources</Link>
          <Link to="/Team" className='Route'>Team Info</Link>
          <Link to="/Profile" className='Route'>Favourites</Link>
          <Link to="/Chat" className='Route'>Chat</Link>

        </div>
          <Switch>
            <Route exact path="/" render={() => (<SignUpPage cookies={this.props.cookies}/>)}/>
            <Route exact path="/SignIn" render={() => (<SignInPage cookies={this.props.cookies}/>)}/>
            {this.props.isLoggedIn &&(
              <div>
                <Route exact path="/Main" render={() => (<Main cookies={this.props.cookies}/>)}/>
                <Route exact path="/Sources" component={Sources}/>
                <Route exact path="/Team" component={Info}/>
                <Route exact path="/Profile" render={() => (<Profile content='likedOnly' cookies={this.props.cookies}/> )}/>
                <Route exact path="/Chat" component={ChatBox}/>
              </div>)
            } 

          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps=state=>{
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

const mapDispatchToProps=dispatch=>{
  return{
    setLoading: (val)=>dispatch(actiontypes.setLoading(val)),
    setNewsEnd: (val)=>dispatch(actiontypes.setNewsEnd(val)),
    setArticles: (val)=>dispatch(actiontypes.setArticles(val)),
    setErrorExist: (val)=>dispatch(actiontypes.setErrorExist(val)),
    setCountry: (val)=>dispatch(actiontypes.setCountry(val)),
    setPage: (val)=>dispatch(actiontypes.setPage(val)),
    setLoginStatus: (val)=>dispatch(actiontypes.setLoginStatus(val)),
    setUserId: (val: string)=>dispatch(actiontypes.setUserId(val)),
    setCookieLoad: (val: boolean)=>dispatch(actiontypes.setCookieLoad(val)),
  };
}

export default withCookies(connect(mapStateToProps,mapDispatchToProps)((withFirebase(App))));
