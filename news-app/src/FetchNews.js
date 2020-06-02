import  {getNews}  from './components/NewsFetch/news';
import React from 'react';
import {connect} from 'react-redux';
import * as actiontypes from './components/Redux/Actions';

const Fetchnews =()=>{
    getNews(this.props.country,this.props.page)
    .then(articles=> {
      const new_articles=[...this.props.articles,...articles];
      this.props.setarticles(new_articles);
      this.props.setloading(false);
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
  
  export default connect(mapStateToProps,mapDispatchToProps)({Fetchnews});

