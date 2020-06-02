import React, {Component} from 'react';
import './App.css';
import Display from './components/MainBody/Display';
import Head from './components/Header/head';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Loader from './components/Loader/Loader'
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import {BrowserRouter} from 'react-router-dom';
// import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actiontypes from './components/Redux/Actions';
import {fetchNews,fetchNewsSearch} from './components/NewsFetch/Fetch'

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
    this.searchNews=this.searchNews.bind(this);
    this.fetchNewsSearch=fetchNewsSearch.bind(this);
  }

  componentDidMount(){
      this.fetchnews();
  }

  async changeCountry(code)
  {
    await this.props.setloading(true);
    await this.props.setcountry(code);
    await this.props.setarticles([]);
    await this.props.setpage(1);
    await this.props.setnewsend(false);
    await this.props.seterrorexist(false);
    this.fetchnews();
  }
  
  async searchNews (search)
  {
    await this.props.setloading(true);
    await this.props.setcountry("");
    await this.props.setarticles([]);
    await this.props.setpage(1);
    await this.props.setnewsend(false);
    await this.props.seterrorexist(false);
    this.fetchNewsSearch(search,this.props.page);
  }

  SelectiveDisplay(){
    if(this.props.error_exist)
      return <ErrorHandler />
    else{
      return(
        <div>
          <Display loading={this.props.is_loading} array={this.props.articles} /> 
          <Loader news_end={this.props.news_end}/>
        </div>
      );
    }
  }

  render(){
    if(this.props.news_end){
      return (
        <BrowserRouter>
          <div>
            <Head currentCode={this.props.country} onChange={this.changeCountry} search={this.searchNews} />
            {this.SelectiveDisplay()}
          </div>
        </BrowserRouter>
      )}
    else{
      return (
        <BrowserRouter>
          <div>
            <BottomScrollListener debounce={3000} offset={10} onBottom={this.fetchnews}/>
            <Head currentCode={this.props.country} onChange={this.changeCountry} search={this.searchNews} />
            {this.SelectiveDisplay()}
          </div>
        </BrowserRouter>
      )}

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
