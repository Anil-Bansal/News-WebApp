import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import * as actiontypes from './components/Redux/Actions';
import {fetchNews} from './components/NewsFetch/Fetch'
import Main from './components/MainBody/Main'
import {BrowserRouter,Link,Route, Switch} from 'react-router-dom';
import Sources from './components/Sources/Sources';
import Info from './components/TeamPage/TeamInfo';
import { withCookies } from 'react-cookie';

class App extends Component{

  constructor(props){
    super(props);
    this.fetchnews=fetchNews.bind(this);
  }
 
  render(){
    return(
      <BrowserRouter>
      <div>
        <div className='Top'>
          <Link to="/" className='Route'>News Fetch  </Link>
          <Link to="/Sources" className='Route'>Sources</Link>
          <Link to="/Team" className='Route'>Team Info</Link>
        </div>
          <Switch>
            <Route exact path="/" render={() => (<Main cookies={this.props.cookies}/>)}/>
            <Route exact path="/Sources" component={Sources}/>
            <Route exact path="/Team" component={Info}/>
          </Switch>

        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps=state=>{
  return{
    is_loading: state.is_loading,
    page: state.page,
    country: state.country ,
    articles: state.articles,
    news_end: state.news_end,
    error_exist: state.error_exist,
  };
}

const mapDispatchToProps=dispatch=>{
  return{
    setloading: (val)=>dispatch(actiontypes.setloading(val)),
    setnewsend: (val)=>dispatch(actiontypes.setnewsend(val)),
    setarticles: (val)=>dispatch(actiontypes.setarticles(val)),
    seterrorexist: (val)=>dispatch(actiontypes.seterrorexist(val)),
    setcountry: (val)=>dispatch(actiontypes.setcountry(val)),
    setpage: (val)=>dispatch(actiontypes.setpage(val))
  };
}

export default withCookies(connect(mapStateToProps,mapDispatchToProps)(App));
