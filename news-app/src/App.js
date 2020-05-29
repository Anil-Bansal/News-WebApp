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
        country: 'us',
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
      country: code
    });
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

  fetchnews(){
    getNews(this.state.country)
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
