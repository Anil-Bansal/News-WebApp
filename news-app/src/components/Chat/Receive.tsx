import React from "react";
import { withFirebase } from "../Firebase";
import * as actiontypes from '../Redux/Actions';
import {connect} from 'react-redux';
import { StateTypes } from "../Redux/Reducers";


class Receive extends React.Component{

    render(){
        return(
        <div>
            {this.props.firebase.listenMessages(this.props.setMessages)}
            {console.log('a',this.props.messages)}
        </div>
        )
    }
}


const mapStateToProps=(state:StateTypes)=>{
    return{
      messages: state.messages,
      uid: state.uid,
    };
  }
  
const mapDispatchToProps=(dispatch: any)=>{
  return{
    setMessages: (val: Array<string>)=>dispatch(actiontypes.setMessages(val))
  };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(withFirebase(Receive));
  