import React from "react";
import { withFirebase } from "../Firebase";
import * as actiontypes from '../Redux/Actions';
import {connect} from 'react-redux';
import { StateTypes } from "../Redux/Reducers";
import {List,ListItemText,ListItem} from '@material-ui/core';
class Receive extends React.Component{

    constructor(props){
      super(props);
      this.state={
        messages: []
      }
    }

    componentDidMount(){
      this.getMessages()
    }

    getMessages=()=>{
      var ref=this.props.firebase.realDatabase.ref().child('messages').limitToLast(20);
      ref.on('value',snapshot=>{
        let newmessages=[]
        snapshot.forEach(child=>{
          var cur=child.val()
          newmessages.push({message: cur.message, user: cur.userName})
        })
        this.setState({messages: newmessages});
      })
    }

    rendermessages=()=>{
      return this.state.messages.map(message=>(
        <ListItem>
          <ListItemText style={{wordBreak: "break-word"}} primary={message.user +' : ' + message.message}></ListItemText>
        </ListItem>
      ))
    }

    render(){
        return(
        <div >
            <List>
              {this.rendermessages()}
            </List>
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
  