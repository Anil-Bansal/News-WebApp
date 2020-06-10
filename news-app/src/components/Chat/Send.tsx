import React from "react";
import { withFirebase } from "../Firebase";
import * as actiontypes from '../Redux/Actions';
import {connect} from 'react-redux';
import { StateTypes } from "../Redux/Reducers";
import { TextField } from "@material-ui/core";

const INITIAL_STATE = {
    message: ''
  };

class Send extends React.Component{
    constructor(props: Props) {
        super(props);
        this.state = { ...INITIAL_STATE };
      }

    onSubmit = (event: any) => {
        console.log(this.state.message)
        this.props.firebase.sendMessage(this.state.message)
        event.preventDefault();
      };

    onChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
    };

    render(){
      const{ message } = this.state;
        console.log('b')
        return(
        <div>
            <form onSubmit={this.onSubmit}>
                <TextField
                    name="message"
                    value={message}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter Message"
                />
              <button style={{marginBottom:20}} size='lg' variant="primary" type="submit">Send</button>
          </form>
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
  
export default connect(mapStateToProps,mapDispatchToProps)(withFirebase(Send));
  