import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import * as actiontypes from './components/Redux/Actions';
import {fetchNews} from './components/NewsFetch/Fetch'
import Main from './components/MainBody/Main'

class App extends Component{

  constructor(props){
    super(props);
    this.state={
        is_loading: true,
        page: 0,
        country: 'in',
        articles:[],
        news_end: false,
        error_exist: false,    
    };
    this.fetchnews=fetchNews.bind(this);
  }

  componentDidMount(){
      this.fetchnews();
  }
 
  render(){
    return(
      <Main />
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

export default connect(mapStateToProps,mapDispatchToProps)(App);
