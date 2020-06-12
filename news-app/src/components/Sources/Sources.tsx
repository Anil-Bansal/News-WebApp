import React, { Component } from 'react';
import DisplaySources from './DisplaySources';
import {connect} from 'react-redux';
import Head from '../Header/head'
import ClipLoader from 'react-spinners/ClipLoader';
import {StateTypes} from '../Redux/Reducers'
import { NewsPost } from '../Card/Post';

interface Cookie{
    get: Function,
    set: Function
}

interface SourcesProps{
    country: string;
    cookies: Cookie;
}

interface State{
    isLoading: boolean
    sources: Array<NewsPost>
    newsEnd: boolean
}

interface OwnProps{
    cookies: Cookie
}

class Sources extends Component<SourcesProps>{
    public state: State

    constructor(props: SourcesProps){
        super(props);
        this.state={
            isLoading: true,
            sources: [],
            newsEnd: false
        }
        this.fetchSources=this.fetchSources.bind(this);
    }

    fetchSources(country=this.props.country){
        const url: string=`https://newsapi.org/v2/sources?apiKey=ed670e2fd04f475fa4b296d2085be2e3&country=${country}`;
        fetch(url)
        .then((response:{json: Function})=>response.json())
        .then((result:{sources: Array<NewsPost>})=>result.sources)
        .then((sources: Object)=> {
          this.setState({sources: sources});
          this.setState({isLoading: false});
          this.setState({newsEnd: true});
        })
        .catch(error=>{
          console.log(error);
          this.setState({isLoading: false});
          this.setState({newsEnd: true});
        })
    }

    componentDidMount(){
        this.fetchSources();
    }

    shouldComponentUpdate(nextProps: any) {
        if( this.props.country !== nextProps.country)
        {   
            this.setState({isLoading: true})
            this.setState({sources: []})
            this.fetchSources(nextProps.country)
        }
        return true ;
    }

    render(){
        return(
            <div>
                <Head cookies={this.props.cookies}/><br/>
                <DisplaySources loading={this.state.isLoading} array={this.state.sources} />
                <div align='center'>
                    <ClipLoader color={"#123abc"} size={50} loading={this.state.isLoading}/>
                </div>

            </div>
        );
    }
}

const mapStateToProps=(state: StateTypes, ownProps: OwnProps)=>{
    return{
        country: state.country,
        cookies: ownProps.cookies
    };
}

export default connect(mapStateToProps)(Sources);