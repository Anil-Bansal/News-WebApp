import React from "react";
import { withFirebase } from "../Firebase";
import * as actiontypes from '../Redux/Actions';
import {connect} from 'react-redux';
import { StateTypes } from "../Redux/Reducers";
import { TextField } from "@material-ui/core";
import './Chat.css';
import Button from 'react-bootstrap/Button'

const INITIAL_STATE = {
    message: ''
};

interface Props{
	firebase: any,
	name: string,
	isAnonymous: boolean,
	uid: string,
}

class Send extends React.Component<Props>{
	public state:{
		message: string
	}

    constructor(props: Props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

	//Add the current Chat to the database
    onSubmit = (event: any) => {
        this.props.firebase.sendMessage(this.state.message,this.props.name)
        this.props.firebase.addEvent('SendMessage',{uid: this.props.uid});
        event.preventDefault();
        this.setState({message:''})
	};
	
	//Set state values
    onChange = (event: any) => {
    	this.setState({ [event.target.name]: event.target.value });
    };

    render(){
	    const{ message } = this.state;
        return(
			<div>
				<form id="form" onSubmit={this.onSubmit}>
					<TextField
						id="text-field"
						name="message"
						value={message}
						onChange={this.onChange}
						type="text"
						placeholder={this.props.isAnonymous? "Guest users can't chat": "Enter Message"}
						variant="outlined"
						disabled={this.props.isAnonymous}/>
					{this.props.isAnonymous? 
						<Button style={{marginTop:'3px',marginLeft:'3px'}}
								size='lg' 
								variant="primary" 
								type="submit" disabled>
							Send
						</Button>:
						<Button style={{marginTop:'3px',marginLeft:'1px'}} 
								size='lg' 
								variant="primary" 
								type="submit">
							Send
						</Button>}
				</form>
			</div>
        )
    }
}

const mapStateToProps=(state:StateTypes)=>{
    return{
		messages: state.messages,
		uid: state.uid,
		name: state.name,
		isAnonymous: state.isAnonymous
    };
}

const mapDispatchToProps=(dispatch: any)=>{
  	return{
	    setMessages: (val: Array<string>)=>dispatch(actiontypes.setMessages(val))
  	};
}

export default connect(mapStateToProps,mapDispatchToProps)(withFirebase(Send));