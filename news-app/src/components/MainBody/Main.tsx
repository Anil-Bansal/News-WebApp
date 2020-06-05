import React from 'react'
import Display from './Display';
import Head from '../Header/head';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Loader from '../Loader/Loader'
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import {BrowserRouter} from 'react-router-dom';
import {fetchNews,fetchNewsSearch} from '../NewsFetch/Fetch'
import * as actiontypes from '../Redux/Actions';
import {connect} from 'react-redux';


class Main extends React.Component{
	public fetchnews: any;
	public fetchNewsSearch: any;
	public props: any;

    constructor(props){
        super(props);
        this.fetchnews=fetchNews.bind(this);
        this.fetchNewsSearch=fetchNewsSearch.bind(this);
        if((this.props.cookies).get('testing') === null || (this.props.cookies).get('testing') === undefined )
        {
          (this.props.cookies).set('testing',[],{path: '/'})
        }
      }

    
    async componentDidMount(){
      console.log("In Main.js");
      await this.props.setcountry('in');
      await this.props.setpage(1);
      await this.props.setarticles([]);
      this.fetchnews();
    }

    SelectiveDisplay(){
        if(this.props.error_exist)
          return <ErrorHandler />
        else{
          return(
            <div>
              <Display cookies={this.props.cookies}/> 
              <Loader />
            </div>
          );
        }
      }
    

    render(){
    if(this.props.news_end){
        return(
            <BrowserRouter>
            <div>
                <Head />
                {this.SelectiveDisplay()}
            </div>
            </BrowserRouter>
        )}
    else{
        return(
            <BrowserRouter>
            <div>
                <BottomScrollListener debounce={3000} offset={10} onBottom={this.fetchnews}/>
                <Head />
                {this.SelectiveDisplay()}
            </div>
            </BrowserRouter>
        )}
    }
}
const mapStateToProps=(state,ownProps)=>{
    return{
      page: state.page,
      country: state.country ,
      articles: state.articles,
      news_end: state.news_end,
      error_exist: state.error_exist,
      cookies: ownProps.cookies,
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(Main);
  