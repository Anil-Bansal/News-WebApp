import React, {Component} from 'react';
import './App.css';
import  {getNews}  from './components/NewsFetch/news';
import Display from './components/MainBody/Display';
import Head from './components/Header/head';
import {getNews2} from './components/NewsFetch/news2';
//import debounce from 'lodash.debounce';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Loader from './components/Loader/Loader'
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import {BrowserRouter, Route} from 'react-router-dom';
import Sources from './components/Sources/Sources';


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
    // this.update=this.update.bind(this);
  }

  componentDidMount(){
      this.fetchnews();
  }

  changeCountry = (code)=>
  {
    this.setState((prevstate,props)=>{
      return{
        is_loading:true,
        country: code,
        articles: [],
        page: 1,
        news_end: false,
        error_exist: false,
      }
    });
    this.fetchnews(code,1);
  }
  searchNews = (search)=>
  {
    this.setState({
      is_loading:true,
      country: "",
      articles: [],
      page: 1,
      news_end: false,
      error_exist: false,
    });
    this.fetchNewsSearch(search,this.state.page);
  }

  fetchnews(country=this.state.country,page=this.state.page+1){
    getNews(country,page)
    .then(articles=> {
      this.setState({articles: [...this.state.articles,...articles]});
      this.setState({is_loading: false});
      if(articles.length<10){
        this.setState({news_end : true})
      }
    })
    .catch(error=>{
      console.log(error);
      this.setState({is_loading: false});
      this.setState({error_exist: true});
    })

    this.setState((prevstate,props)=>{
      return {
        page: prevstate.page+1
      }
    });
  }

  fetchNewsSearch(search,page){
    getNews2(search,page)
    .then(articles=> {
      this.setState({articles: [...this.state.articles,...articles]});
      this.setState({is_loading: false});
      this.setState({page: this.state.page+1});
      this.setState({news_end: true});

    })
    .catch(error=>{
      console.log(error);
      this.setState({is_loading: false});
      this.setState({error_exist: true});
    })

    this.setState((prevstate,props)=>{
      return {
        page: prevstate.page+1
      }
    });
  }

  SelectiveDisplay(){
    if(this.state.error_exist)
      return <ErrorHandler />
    else{
      return(
        <div>
          <Display loading={this.state.is_loading} array={this.state.articles} /> 
          <Loader news_end={this.state.news_end}/>
        </div>
      );
    }
  }

  render(){
    return (
      <BrowserRouter>
        <div>
          <BottomScrollListener debounce={3000} offset={10} onBottom={this.fetchnews}/>
          <Head currentCode={this.state.country} onChange={this.changeCountry} search={this.searchNews} />
          {this.SelectiveDisplay()}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
