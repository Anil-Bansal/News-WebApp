import ClipLoader from 'react-spinners/ClipLoader';
import React from 'react';
import {connect} from 'react-redux';

class Loader extends React.Component{
    render(){
        return (
            <div align='center'>
                <ClipLoader color={"#123abc"} size={50} loading={!this.props.news_end}/>
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
      is_loading: state.is_loading,
      news_end: state.news_end,
      error_exist: state.error_exist,
    };
  }
  
  export default connect(mapStateToProps)(Loader);