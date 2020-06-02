import React, {Component} from 'react';
import './App.css';
// import  {getNews}  from './components/NewsFetch/news';
import Display from './components/MainBody/Display';
import Head from './components/Header/head';
import {getNews} from './components/NewsFetch/news';

import {getNews2} from './components/NewsFetch/news2';
//import debounce from 'lodash.debounce';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Loader from './components/Loader/Loader'
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import {BrowserRouter} from 'react-router-dom';
// import {BrowserRouter, Route} from 'react-router-dom';

// import Sources from './components/Sources/Sources';
import {connect} from 'react-redux';
import * as actiontypes from './components/Redux/Actions';
// eslint-disable-next-line
import FetchNews from './FetchNews'


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
    this.fetchnews=this.fetchnews.bind(this);
    this.searchNews=this.searchNews.bind(this);
    this.fetchNewsSearch=this.fetchNewsSearch.bind(this);
    // this.update=this.update.bind(this);
  }

  componentDidMount(){
      this.fetchnews();
  }

  hello= ()=>{console.log('hello')}

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

  fetchnews() {
    getNews(this.props.country,this.props.page)
    .then(articles=> {
      const new_articles=[...this.props.articles,...articles];
      this.props.setarticles(new_articles);
      //console.log(this.props.articles.length);
      this.props.setloading(false);
      //console.log(this.props.is_loading);
      if(articles.length<10){
        this.props.setnewsend(true);
      }
    })
    .catch(error=>{
      console.log(error);
      this.props.setloading(false);
      this.props.seterrorexist(true);
    })

    this.props.setpage(this.props.page+1);
  }

  fetchNewsSearch(search,page){
    getNews2(search,page)
    .then(articles=> {
      const new_articles=[...this.props.articles,...articles];
      this.props.setarticles(new_articles);
      this.props.setloading(false);
      this.props.setnewsend(true);
      this.props.setpage(this.props.page+1);
    })
    .catch(error=>{
      console.log(error);
      this.props.setloading(false);
      this.props.seterrorexist(true);
    })
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
    return (
      <BrowserRouter>
        <div>
          <BottomScrollListener debounce={3000} offset={10} onBottom={this.fetchnews}/>
          <Head currentCode={this.props.country} onChange={this.changeCountry} search={this.searchNews} />
          {this.SelectiveDisplay()}
        </div>
      </BrowserRouter>
    );
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
