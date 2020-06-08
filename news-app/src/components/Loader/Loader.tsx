import ClipLoader from 'react-spinners/ClipLoader';
import React from 'react';
import {connect} from 'react-redux';

class Loader extends React.Component{
	public props: Object;

    render(){
        return (
            <div align='center'>
                <ClipLoader color={"#123abc"} size={50} loading={!this.props.newsEnd}/>
            </div>
        );
    }
}

const mapStateToProps=(state: Object)=>{
    return{
      newsEnd: state.newsEnd,
    };
  }
  
export default connect(mapStateToProps)(Loader);