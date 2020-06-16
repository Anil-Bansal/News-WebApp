import React from "react";
import { withFirebase } from "../Firebase";
import * as actiontypes from '../Redux/Actions';
import {connect} from 'react-redux';
import { StateTypes } from "../Redux/Reducers";
import {List,ListItemText,ListItem} from '@material-ui/core';
import './Chat.css';

interface Message{
	message: string,
	user: string
}

interface Props{
	firebase: any,
}

class Receive extends React.Component<Props>{
	public state:{
		messages: Array<string>
	}

	messageEndRef=React.createRef();
	constructor(props: Props){
		super(props);
		this.state={
			messages: []
		}
	}

	//Getting the messages from database and scrolling to bottom of chat

	componentDidMount(){	
		this.getMessages();
		this.scrollToBottom();
	}

	//Scrolling to Bottom on Chat Update

	componentDidUpdate(){
		this.scrollToBottom();
	}

	//Utility Function for Sscroll To Bottom

	scrollToBottom=()=>{
		this.messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
	}

	//Function which gets called everytime there is a change in chat database

	getMessages=()=>{
		var ref=this.props.firebase.realDatabase.ref().child('messages').limitToLast(30);
		ref.on('value',(snapshot: any)=>{
			let newmessages: Array<Object>=[]
			snapshot.forEach((child: any)=>{
				var cur=child.val()
				newmessages.push({message: cur.message, user: cur.userName})
			})
			this.setState({messages: newmessages});
		})
	}

	//Render Messages to the Display
	rendermessages=()=>{
		return this.state.messages.map((message: any)=>(
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
				<div ref={this.messageEndRef}/>
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
	