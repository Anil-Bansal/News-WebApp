import React, {Component} from 'react';
import './App.css';
//import  {getNews}  from './news';
import Head from './head'
import Post from './Post';
import ClipLoader from 'react-spinners/ClipLoader';

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

  fetchnews(){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.state.country}&apiKey=ad23c45e8dbf4c418fc72871384d9ec5`;
    fetch(url)
    .then(response =>  response.json())
    .then(result=> result.articles)
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
    const loading=this.state.is_loading;
    let posts=this.state.articles.map(post=>{
      return <Post title={post.title} imageurl={post.urlToImage} description={post.description}/>
    });

    return (
      <div>
        <Head/>
        {loading ? <ClipLoader /> : {posts}}

      </div>
    );
  }
}

export default App;
