import React, {Component} from 'react';
import './App.css';
import  {getNews}  from './news';
import Display from './Display';
import Head from './head';

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
    this.fetchnews(code);
  }

  componentWillMount(){
    window.addEventListener('scroll', function() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log("you're at the bottom of the page");
         //show loading spinner and make fetch request to api
        this.setState({page: this.state.page+1});
        this.setState({is_loading: true});
        this.fetchnews(); 
      }
   });
  }

  fetchnews(country=this.state.country){
    console.log(country)
    getNews(country)
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
        <Head currentCode={this.state.country} onChange={this.changeCountry} />
        <Display loading={this.state.is_loading} array={this.state.articles} /> 
      </div>
    );
  }
}

export default App;
