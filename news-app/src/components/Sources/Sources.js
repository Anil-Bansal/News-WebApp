import React, { Component } from 'react';
import Loader from 'react-spinners/ClipLoader';
import DisplaySources from './DisplaySources';
import {connect} from 'react-redux';

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
        const url=`https://newsapi.org/v2/sources?apiKey=ed670e2fd04f475fa4b296d2085be2e3&country=${this.props.country}`;
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