import React from 'react'
import Display from './Display';
import Head from '../Header/head';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Loader from '../Loader/Loader'
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import {fetchNews,fetchNewsSearch,fetchLiked} from '../NewsFetch/Fetch'
import * as actiontypes from '../Redux/Actions';
import {connect} from 'react-redux';
import {withFirebase} from '../Firebase'

class Main extends React.Component{
	public fetchNews: void;
	public fetchNewsSearch: void;
	
    constructor(props:any ){
        super(props);
        this.fetchNews=fetchNews.bind(this);
        this.fetchLiked=fetchLiked.bind(this);
        if((this.props.cookies).get('testing') === null || (this.props.cookies).get('testing') === undefined )
        {
        	(this.props.cookies).set('testing',[],{path: '/'})
        }
      }    

    async componentDidMount(){
      await this.props.setCountry('in');
      await this.props.setPage(1);
      await this.props.setArticles([]);
      this.fetchNews();
      this.fetchLiked();
    }

    SelectiveDisplay(){
        if(this.props.errorExist)
          return <ErrorHandler />
        else{
          return(
            <div>
              <Display content='all' cookies={this.props.cookies}/> 
              <Loader />
            </div>
          );
        }
      }

    render(){
      	if(this.props.newsEnd){
            return(
                <div>
                    <Head />
                    {this.SelectiveDisplay()}
                </div>
            )}
      	else{
            return(
                <div>
                    <BottomScrollListener debounce={3000} offset={10} onBottom={this.fetchNews}/>
                    <Head />
                    {this.SelectiveDisplay()}
                </div>
            )}
      }
}

const mapStateToProps=(state: Object,ownProps: Object)=>{
    return{
      page: state.page,
      country: state.country ,
      articles: state.articles,
      newsEnd: state.newsEnd,
      errorExist: state.errorExist,
      cookieLoaded: state.cookieLoaded,
      cookies: ownProps.cookies,
      uid: state.uid,
      liked: state.liked
    };
  }
  
const mapDispatchToProps=dispatch=>{
  return{
    setLoading: (val: Boolean)=>dispatch(actiontypes.setLoading(val)),
    setNewsEnd: (val: Boolean)=>dispatch(actiontypes.setNewsEnd(val)),
    setArticles: (val: Array<Object>)=>dispatch(actiontypes.setArticles(val)),
    setErrorExist: (val: Boolean)=>dispatch(actiontypes.setErrorExist(val)),
    setCountry: (val: String)=>dispatch(actiontypes.setCountry(val)),
    setPage: (val: Number)=>dispatch(actiontypes.setPage(val)),
    setLiked: (val: Number)=>dispatch(actiontypes.setLiked(val))
  };
}
  
  export default connect(mapStateToProps,mapDispatchToProps)(withFirebase(Main));
  