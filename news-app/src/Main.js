import React from 'react'
import Display from './components/MainBody/Display';
import Head from './components/Header/head';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Loader from './components/Loader/Loader'
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import {BrowserRouter} from 'react-router-dom';

class Main extends React.Component{
    

    render(){
    if(this.props.end){
        return(
            <BrowserRouter>
            <div>
                <BottomScrollListener debounce={3000} offset={10} onBottom={this.fetchnews}/>
                <Head currentCode={this.props.country} onChange={this.changeCountry} search={this.searchNews} />
                {this.SelectiveDisplay()}
            </div>
            </BrowserRouter>
        )}
    else{
        return(
            <BrowserRouter>
            <div>
                <BottomScrollListener debounce={3000} offset={10} onBottom={this.fetchnews}/>
                <Head currentCode={this.props.country} onChange={this.changeCountry} search={this.searchNews} />
                {this.SelectiveDisplay()}
            </div>
            </BrowserRouter>
        )}
}

export default Main;