import React, {Component} from 'react';
import './App.css';
import  {getNews}  from './news';
import Display from './Display';
import Head from './head';
import {getNews2} from './news2';
// import debounce from 'lodash.debounce';
import BottomScrollListener from 'react-bottom-scroll-listener';

class App extends Component{

  constructor(props){
    super(props);
    this.state={
        is_loading: true,
        page: 0,
        country: 'in',
        articles:[]    
    };
    this.fetchnews=this.fetchnews.bind(this);
    // this.update=this.update.bind(this);

  }

  componentDidMount(){
      this.fetchnews();
  }

  changeCountry = (code)=>
  {
    this.setState({
      is_loading:true,
      country: code,
      articles: [],
      page: 1
    });
    this.fetchnews(code,1);
  }
  searchNews = (search)=>
  {
    this.setState({
      is_loading:true,
      country: "",
      articles: [],
      page: 1
    });
    this.fetchnews2(search);
  }

  fetchnews(country=this.state.country,page=this.state.page+1){
    getNews(country,page)
    .then(articles=> {
      this.setState({articles: [...this.state.articles,...articles]});
      this.setState({page: this.state.page+1});
      this.setState({is_loading: false});
    })
    .catch(error=>{
      console.log(error);
      this.setState({is_loading: false});
    })
  }

  fetchnews2(search){
    getNews2(search)
    .then(articles=> {
      this.setState({articles: [...this.state.articles,...articles]});
      this.setState({page: this.state.page+1});
      this.setState({is_loading: false});
    })
    .catch(error=>{
      console.log(error);
      this.setState({is_loading: false});
    })
  }

  funct = () =>
   {
     console.log("Hello")
  }

  render(){
    return (
      <div>
        <BottomScrollListener debounce={700} onBottom={this.fetchnews}>
          <Head currentCode={this.state.country} onChange={this.changeCountry} search={this.searchNews} />
          <Display loading={this.state.is_loading} array={this.state.articles} /> 
        </BottomScrollListener>
      </div>
    );
  }
}

export default App;
