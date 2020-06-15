import React from 'react';
import { withFirebase } from '../Firebase';
import {withRouter} from 'react-router-dom';
import Button from  'react-bootstrap/Button';
import {connect} from 'react-redux';
import * as actiontypes from '../Redux/Actions';
import { StateTypes } from '../Redux/Reducers';

interface Cookie {
	get: Function,
	set: Function
}
 
interface Props {
	setLoginStatus: Function,
	setUserId: Function,
	setCookieLoad: Function,
	history: any,
	firebase: any,
	cookies: Cookie
}

class SignOutButton extends React.Component<Props>{
	constructor(props: Props){
		super(props);
		this.signOut=this.signOut.bind(this);
	}

	signOut(){
		this.props.firebase.doSignOut();
		this.props.setLoginStatus(false);
		this.props.setUserId(null);
		this.props.setCookieLoad(false);
		this.props.cookies.set('User','None');
		this.props.cookies.set('Name','No Name');
		this.props.history.push('/SignIn');
	}

	render(){
		return (
		<Button variant='danger' 
				style={{marginLeft: 10}}
				type='button' 
				onClick={this.signOut}>
			Sign Out
		</Button>
		)
	}
}

const mapStateToProps=(state: StateTypes)=>{
  return{
		isLoggedIn: state.isLoggedIn,
		uid: state.uid,
  };
}

const mapDispatchToProps=(dispatch: any)=>{
  return{
		setLoginStatus: (val: boolean)=>dispatch(actiontypes.setLoginStatus(val)),
		setUserId: (val: string)=>dispatch(actiontypes.setUserId(val)),
		setCookieLoad: (val: boolean)=>dispatch(actiontypes.setCookieLoad(val))
  };
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withFirebase(SignOutButton)));