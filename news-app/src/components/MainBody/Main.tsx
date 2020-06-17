import React from 'react'
import Display from './Display';
import Head from '../Header/head';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Loader from '../Loader/Loader'
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import {fetchNews,fetchLiked} from '../NewsFetch/Fetch'
import * as actiontypes from '../Redux/Actions';
import {connect} from 'react-redux';
import {withFirebase} from '../Firebase'
import {StateTypes,DispatchTypes} from '../Redux/Reducers'
import { NewsPost } from '../Card/Post';
import ChatBox from '../Chat/ChatBox';
import Splitter from 'm-react-splitters'
import './Main.css'

interface MainProps extends DispatchTypes,StateTypes{
	cookies: {get: Function, set:Function};
}

class Main extends React.Component<MainProps>{
	public fetchNews: () => void;
	public fetchLiked: Function;
	
	constructor(props:MainProps ){
		super(props);
		this.fetchNews = fetchNews.bind(this);
		this.fetchLiked =fetchLiked.bind(this);
		if((this.props.cookies).get('testing') === null || (this.props.cookies).get('testing') === undefined )
			(this.props.cookies).set('testing',[],{path: '/'})
	}    

	async componentDidMount(){
		if(!this.props.country){this.props.setCountry('in')}
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
					<Display show='all' cookies={this.props.cookies}/> 
					<div data-align='center' className='loader'>
						<Loader />
					</div>
				</div>
			);
		}
	}

	render(){
		return(
			<div>
				{!this.props.newsEnd ? 
					<BottomScrollListener debounce={3000} 
							offset={10} 
							onBottom={this.fetchNews}/> :
					<div/>}
				<div className='header'>
					<Head  cookies={this.props.cookies}/></div>                  
				<div className='body'>
					<Splitter position="vertical"
							primaryPaneMaxWidth='24%'
							primaryPaneWidth="24%"
							postPoned={true} >
						<div className='navigator'>
							<ChatBox/>
						</div>
						<div className='content'>
							{this.SelectiveDisplay()}
						</div>
					</Splitter>
				</div>
			</div>
		)
	}
}

const mapStateToProps=(state:StateTypes,ownProps: {cookies: {get: Function, set: Function}})=>{
	return{
		newsEnd: state.newsEnd,
		country: state.country,
		page: state.page,
		errorExist: state.errorExist,
		cookies: ownProps.cookies,
		isLoading: state.isLoading,
		articles: state.articles,
		uid: state.uid,
	};
}
	
const mapDispatchToProps=(dispatch: any)=>{
	return{
		setLoading: (val: Boolean)=>dispatch(actiontypes.setLoading(val)),
		setNewsEnd: (val: Boolean)=>dispatch(actiontypes.setNewsEnd(val)),
		setArticles: (val: Array<Object>)=>dispatch(actiontypes.setArticles(val)),
		setErrorExist: (val: Boolean)=>dispatch(actiontypes.setErrorExist(val)),
		setCountry: (val: string)=>dispatch(actiontypes.setCountry(val)),
		setPage: (val: number)=>dispatch(actiontypes.setPage(val)),
		setLiked: (val: Array<NewsPost>)=>dispatch(actiontypes.setLiked(val))
	};
}
	
export default connect(mapStateToProps,mapDispatchToProps)(withFirebase(Main));