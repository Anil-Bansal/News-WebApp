import React, {Component} from 'react';
import './App.css';
import  {getNews}  from './news';
import Display from './Display';
import Head from './head';
import {getNews2} from './news2';
import debounce from 'lodash.debounce';

class App extends Component{

  constructor(props){
    super(props);
    this.state={
        is_loading: true,
        page: 1,
        country: 'in',
        articles:[]    
    };
    this.fetchnews=this.fetchnews.bind(this);
    this.update=this.update.bind(this);

    window.onscroll = debounce(() => {
      const {
        update,
        state: {
          page,
          is_loading,
          country,
        },
      } = this;

      // Checks that the page has scrolled to the bottom
      if (window.innerHeight + document.documentElement.scrollTop=== document.documentElement.offsetHeight) {
        update();
      }
    }, 100);

  }

  componentDidMount(){
      this.fetchnews();
  }


  update(){
    this.setState({page: this.state.page+1});
    this.setState({is_loading: true});
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
    this.fetchnews(code);
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

  fetchnews(country=this.state.country){
    getNews(country,this.state.page)
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

  render(){
    return (
      <div>
        <Head currentCode={this.state.country} onChange={this.changeCountry} search={this.searchNews} />
        <Display loading={this.state.is_loading} array={this.state.articles} /> 
      </div>
    );
  }
}

export default App;
