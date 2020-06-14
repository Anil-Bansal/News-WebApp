import React from "react";
import { withFirebase } from "../Firebase";
import * as actiontypes from '../Redux/Actions';
import {connect} from 'react-redux';
import { StateTypes } from "../Redux/Reducers";
import {List,ListItemText,ListItem} from '@material-ui/core';
import './Chat.css';

interface Props{
  firebase: any,
}

interface Message{
  message: string,
  user: string
}
class Receive extends React.Component<Props>{

    messageEndRef=React.createRef();

    constructor(props: Props){
      super(props);
      this.state={
        messages: []
      }
    }

    componentDidMount(){
      this.getMessages();
      this.scrollToBottom();
    }

    componentDidUpdate(){
      this.scrollToBottom();
    }

    scrollToBottom=()=>{
      this.messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    getMessages=()=>{
      var ref=this.props.firebase.realDatabase.ref().child('messages').limitToLast(20);
      ref.on('value',(snapshot: any)=>{
        let newmessages: Array<Object>=[]
        snapshot.forEach((child: any)=>{
          var cur=child.val()
          newmessages.push({message: cur.message, user: cur.userName})
        })
        this.setState({messages: newmessages});
      })
    }

    rendermessages=()=>{
      return this.state.messages.map((message: Message)=>(
        <ListItem>
          <ListItemText style={{wordBreak: "break-word"}} primary={message.user +' : ' + message.message}></ListItemText>
        </ListItem>
      ))
    }

    render(){
        return(
        <div className='containerChat'>
            <List>
              {this.rendermessages()}
            </List>
            <div ref={this.messageEndRef}></div>
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
  