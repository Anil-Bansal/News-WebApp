import React, { Component } from 'react';
import DisplaySources from './DisplaySources';
import {connect} from 'react-redux';
import Head from '../Header/head'
import ClipLoader from 'react-spinners/ClipLoader';
import {StateTypes} from '../Redux/Reducers'
import { NewsPost } from '../Card/Post';

interface SourcesProps{
    country: string;
}

interface State{
    isLoading: boolean
    sources: Array<NewsPost>
    newsEnd: boolean
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
        const url: string=`https://amazekart.tech/news/?source=${country}`
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
                <Head /><br/>
                <DisplaySources loading={this.state.isLoading} array={this.state.sources} />
                <div align='center'>
                    <ClipLoader color={"#123abc"} size={50} loading={this.state.isLoading}/>
                </div>

            </div>
        );
    }
}

const mapStateToProps=(state: StateTypes)=>{
    return{
        country: state.country
    };
}

export default connect(mapStateToProps)(Sources);