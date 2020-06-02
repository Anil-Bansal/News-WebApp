import ClipLoader from 'react-spinners/ClipLoader';
import React from 'react';

class Loader extends React.Component{
    render(){
        return (
            <div align='center'>
                <ClipLoader color={"#123abc"} size={50} loading={!this.props.news_end}/>
            </div>
        );
    }
}

export default Loader;
