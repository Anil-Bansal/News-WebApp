import React, { Component } from 'react';
import Loader from 'react-spinners/ClipLoader';
import DisplaySources from './DisplaySources';

class Sources extends Component{
    constructor(props){
        super(props);
        this.state={
            is_loading: true,
            sources: [],
            news_end: false
        }
        this.fetchsources=this.fetchsources.bind(this);
    }

    fetchsources(){
        const url=`https://newsapi.org/v2/sources?apiKey=ed670e2fd04f475fa4b296d2085be2e3&country=${this.props.match.param.country}`;
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

    render(){
        return(
            <div>
                <DisplaySources loading={this.state.is_loading} array={this.state.sources} />
                <Loader news_end={this.state.news_end} />
            </div>
        );
    }

}
export default Sources;