import React, { Component } from 'react';
import {withFirebase} from '../Firebase';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actiontypes from '../Redux/Actions';
import BeatLoader from 'react-spinners/BeatLoader';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from 'react-bootstrap/Button'
import CssBaseline from '@material-ui/core/CssBaseline';
import GoogleButton from 'react-google-button';
import {StateTypes} from '../Redux/Reducers'

const INITIAL_STATE = {
	name: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	error: null,
};

interface Cookie{
	get: Function,
	set: Function
}

interface Props{
	setLoginStatus: Function,
	setUserId: Function,
	setCookieLoad: Function,
	setLoading: Function,
	cookies: Cookie,
	history: any,
	firebase: any,
	isLoading: boolean,
	setName: Function,
	uid: string,
	setAnonymous: Function,
	name: string
}

class SignUpForm extends Component<Props> {
	public props: Props;
	public state: {
		name: string,
		email: string,
		error: any,
		passwordOne: string,
		passwordTwo: string
	}

    constructor(props: Props) {
		super(props);
		this.googleSignIn=this.googleSignIn.bind(this);
		this.login=this.login.bind(this);
		this.signInSync=this.signInSync.bind(this);
		this.guestSignIn=this.guestSignIn.bind(this)
		this.guestLogin=this.guestLogin.bind(this)
		this.state = {...INITIAL_STATE};
    }

    login () {
      	this.props.setLoginStatus(true);
    }

    async signInSync ()
    {
		var uid: string = await this.props.firebase.getUID();
		await this.props.firebase.getUserName(this.props.setName);
		this.props.setUserId(uid);
		var cookies: Array<string> = await this.props.firebase.getCookieFromDatabase(uid)
		this.props.cookies.set('testing',cookies,{path: '/'});
		this.props.setCookieLoad(true);
		this.props.setAnonymous(false);
		this.props.cookies.set('User',uid);
		this.props.cookies.set('Name',this.props.name);
    }

    guestSignIn = () => {
		this.props.setLoading(true) 
		this.props.firebase.doGuestSignIn()
		.then(() => {
			this.login();
			this.setState({ ...INITIAL_STATE });
			this.guestLogin()
			.then(()=>{
				this.props.history.push('/Main');
			})
		})
		.catch((error: any) => {
			this.props.setLoading(false)
			this.setState({ error });
		});
    }

    async guestLogin()
    {
		var uid: string = await this.props.firebase.getUID()
		this.props.setUserId(uid);
		this.props.setCookieLoad(true);
		this.props.cookies.set('User',uid);
		this.props.setAnonymous(true);
		this.props.setName('Anonymous');
		this.props.cookies.set('Name','Anonymous');
    }

    googleSignIn = () => {
		this.props.setLoading(true)
		this.props.firebase.doGoogleSignIn()
		.then(() => {
			this.login();
			this.setState({ ...INITIAL_STATE });
			this.signInSync()
			.then(()=>{
				this.props.history.push('/Main');
			})
		})
		.catch((error: any) => {
			this.props.setLoading(false)
			this.setState({ error });
		});
    }

    onSubmit = (event: any) => {
		const { name, email, passwordOne } = this.state;
		this.props.setLoading(true)
		this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
		.then(() => {
			this.login();
			this.props.firebase.addName(name);
			this.props.setName(name);
			this.setState({ ...INITIAL_STATE });
			this.props.setAnonymous(false);
			this.props.setUserId(this.props.firebase.getUID());
			this.props.firebase.addNewUser(this.props.firebase.getUID());
			this.props.cookies.set('testing',[],{path: '/'});
			this.props.cookies.set('User',this.props.uid);
			this.props.history.push('/Main');
		})
		.catch((error: any) => {
			this.props.setLoading(false)
			this.setState({ error });
		});
		event.preventDefault();
    }
   
    onChange = (event: any) => {
      	this.setState({ [event.target.name]: event.target.value });
    };

    showPassword = () => {
		var passwordComponent:{type: string} = document.getElementById('password');
		if(passwordComponent.type === 'password') {
			passwordComponent.type = 'text';
		}
		else if(passwordComponent.type === 'text') {
			passwordComponent.type = 'password';
		}

		var confirmpasswordComponent:{type: string} = document.getElementById('confirmpassword');
		if(confirmpasswordComponent.type === 'password') {
			confirmpasswordComponent.type = 'text';
		}
		else if(confirmpasswordComponent.type === 'text') {
			confirmpasswordComponent.type = 'password';
		}
    }
   
    render() {
		const {
			name,
			email,
			passwordOne,
			passwordTwo,
			error} = this.state;
  
      	const isInvalid = 
			passwordOne !== passwordTwo || 
			passwordOne === '' || 
			email === ''||
			name === '';
  
        return (
			<Container component="main" maxWidth="xs" style={{marginTop:50}}>
			<CssBaseline />
			<div align='center'>
				<Avatar >
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h4" style={{marginBottom:20}}>
					Sign Up
				</Typography>
				<BeatLoader color={"#123abc"} size={20} loading={this.props.isLoading} />
				<div>
					<form onSubmit={this.onSubmit}>
						<div align='center'>
							<TextField
								name="name"
								value={name}
								onChange={this.onChange}
								type="text"
								placeholder="Name"
								variant="outlined"
								style={{marginBottom:20}}/>
							<TextField
								name="email"
								value={email}
								onChange={this.onChange}
								type="text"
								placeholder="Email Address"
								variant="outlined"
								style={{marginBottom:20}}/>
							<TextField
								name="passwordOne"
								value={passwordOne}
								onChange={this.onChange}
								type="password"
								placeholder="Password"
								variant="outlined"
								style={{marginBottom:20}}
								id="password"/>
							<TextField
								name="passwordTwo"
								value={passwordTwo}
								onChange={this.onChange}
								type="password"
								placeholder="Confirm Password"
								variant="outlined"
								style={{marginBottom:20}}
								id="confirmpassword"/>
						</div>
						<input type="checkbox" onClick={this.showPassword} style={{marginBottom:20}}/>
						<span> Show Password</span><br/>
						{isInvalid ? 
							<Button style={{marginBottom:20}} size='lg' variant="secondary" disabled>Register</Button>
							: <Button style={{marginBottom:20}} size='lg' variant="primary" type="submit">Register</Button>
						}
						{error && <h5 style={{marginTop:10}}>{error.message}</h5>}
					</form>
					<Button style={{paddingLeft:40, paddingRight:40, marginBottom:20}} 
						size='lg' 
						variant="warning" 
						onClick={() => this.guestSignIn()}>
						Sign Up as Guest
					</Button>
					<GoogleButton onClick={this.googleSignIn} />
         		</div>
			</div>
          	</Container>
	    );
    }
}

const mapStateToProps=(state: StateTypes)=>{
	return{
		isLoggedIn: state.isLoggedIn,
		uid: state.uid,
		isLoading: state.isLoading
	};
}

const mapDispatchToProps=(dispatch: any)=>{
	return{
		setLoginStatus: (val: boolean)=>dispatch(actiontypes.setLoginStatus(val)),
		setUserId: (val: string)=>dispatch(actiontypes.setUserId(val)),
		setCookieLoad: (val: boolean)=>dispatch(actiontypes.setCookieLoad(val)),
		setLoading: (val: boolean)=>dispatch(actiontypes.setLoading(val)),
		setName: (val: string)=>dispatch(actiontypes.setName(val)),
		setAnonymous: (val: boolean)=>dispatch(actiontypes.setAnonymous(val))
	};
}
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withFirebase(SignUpForm)))