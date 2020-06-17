import ClipLoader from 'react-spinners/ClipLoader';
import React from 'react';
import {connect} from 'react-redux';
import { StateTypes } from '../Redux/Reducers';

interface Props{
    newsEnd: boolean;
}

class Loader extends React.Component{
	public props: Props;

    render(){
        return (
            <div data-align='center'>
                <ClipLoader color={"#123abc"} size={50} loading={!this.props.newsEnd}/>
            </div>
        );
    }
}

const mapStateToProps=(state: StateTypes)=>{
    return{
          newsEnd: state.newsEnd,
    };
}
  
export default connect(mapStateToProps)(Loader);