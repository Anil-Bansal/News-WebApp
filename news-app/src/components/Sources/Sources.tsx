import React, { Component } from 'react';
import DisplaySources from './DisplaySources';
import {connect} from 'react-redux';
import Head from '../Header/head'
import ClipLoader from 'react-spinners/ClipLoader';

class Sources extends Component{
	// public state: any;
	// public props: any;
	// public setState: any;

    constructor(props){
        super(props);
        this.state={
            is_loading: true,
            sources: [],
            news_end: false
        }
        this.fetchsources=this.fetchsources.bind(this);
    }

    fetchsources(country=this.props.country){
        const url=`https://newsapi.org/v2/sources?apiKey=ed670e2fd04f475fa4b296d2085be2e3&country=${country}`;
        fetch(url)
        .then(response=>response.json())
        .then(result=>result.sources)
        .then(sources=> {
          this.setState({sources: sources});
          this.setState({is_loading: false});
          this.setState({news_end: true});
        })
        .catch(error=>{
          console.log(error);
          this.setState({is_loading: false});
          this.setState({news_end: true});
        })
    }

    componentDidMount(){
        this.fetchsources();
    }

    shouldComponentUpdate(nextProps) {
        console.log(this.props.country, nextProps.country)
        if( this.props.country !== nextProps.country)
        {   
            this.setState({is_loading: true})
            this.setState({sources: []})
            this.fetchsources(nextProps.country)
        }
        return true ;
    }

    render(){
        return(
            <div>
                <Head/>
                <DisplaySources loading={this.state.is_loading} array={this.state.sources} />
                <div align='center'>
                    <ClipLoader color={"#123abc"} size={50} loading={this.state.is_loading}/>
                </div>

            </div>
        );
    }

}

const mapStateToProps=state=>{
    return{
        country: state.country
    };
}

export default connect(mapStateToProps)(Sources);