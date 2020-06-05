import ClipLoader from 'react-spinners/ClipLoader';
import React from 'react';
import {connect} from 'react-redux';

class Loader extends React.Component{
	public props: Object;

    render(){
        return (
            <div align='center'>
                <ClipLoader color={"#123abc"} size={50} loading={!this.props.news_end}/>
            </div>
        );
    }
}

const mapStateToProps=(state: Object)=>{
    return{
      news_end: state.news_end,
    };
  }
  
  export default connect(mapStateToProps)(Loader);