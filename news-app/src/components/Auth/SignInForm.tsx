import React, { Component } from 'react';
import {withFirebase} from '../Firebase';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actiontypes from '../Redux/Actions';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from 'react-bootstrap/Button'
import CssBaseline from '@material-ui/core/CssBaseline';
import GoogleButton from 'react-google-button';
import BeatLoader from 'react-spinners/BeatLoader';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
  };

class SignInForm extends Component {
	public state: any;
	public props: any;
	public email: any;
	public password: any;
	public error: any;

    constructor(props: any) {
      super(props);
      this.login=this.login.bind(this)
      this.signInSync=this.signInSync.bind(this)
      this.guestSignIn=this.guestSignIn.bind(this)
      this.guestLogin=this.guestLogin.bind(this)
      this.googleSignIn=this.googleSignIn.bind(this)

      this.state = { ...INITIAL_STATE };
    }
  
    login () {
     this.props.setLoginStatus(true);
    }
   
    async signInSync ()
      {
        var uid: string = await this.props.firebase.getUID()
        this.props.setUserId(uid);
        var cookies: Array<string> = await this.props.firebase.getCookieFromDatabase(uid)
        this.props.cookies.set('testing',cookies,{path: '/'});
        this.props.setCookieLoad(true)
      }

    async guestLogin()
    {
      var uid: string = await this.props.firebase.getUID()
      this.props.setUserId(uid);
      this.props.setCookieLoad(true)
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
      .catch(error => {
        this.props.setLoading(false)
        this.setState({ error });
      });
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
      .catch(error => {
        this.props.setLoading(false)
        this.setState({ error });
      });
    }

    onSubmit = event => {
      this.props.setLoading(true)
      const { email, password } = this.state;    
      this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
          this.login();
          this.setState({ ...INITIAL_STATE });
          this.signInSync( )
          .then(()=>{
            this.props.history.push('/Main');
          })
        })
        .catch(error => {
          this.props.setLoading(false)
          this.setState({ error });
        });
      
      event.preventDefault();
    };
   
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    showPassword = () => {
      var passwordComponent = document.getElementById('pass');
      if(passwordComponent.type === 'password') {
        passwordComponent.type = 'text';
      }
      else if(passwordComponent.type === 'text') {
        passwordComponent.type = 'password';
      }
    }
   
    render() {
      const { email, password, error } = this.state;
      const isInvalid = password === '' || email === '';

      return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div align='center' style={{marginTop:50}}>
          <Avatar >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" style={{marginBottom:20}}>
            Sign In
          </Typography>
            <BeatLoader color={"#123abc"} size={20} loading={this.props.isLoading} />
          <form onSubmit={this.onSubmit} style={{marginTop:10}}>
          <div  align='center'>
            <TextField
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
              style={{marginBottom:20}}
              variant="outlined"
                  
            />
            <TextField
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
              variant="outlined"
              id='pass'
                  style={{marginBottom:15}}
            />
          </div>
            <input type="checkbox" onClick={this.showPassword} style={{marginBottom:20}}/>
            <span> Show Password</span><br/>
             
            {isInvalid ? 
                <Button style={{marginBottom:20}} size='lg' variant="secondary" disabled>Login</Button>
              : <Button style={{marginBottom:20}} size='lg' variant="primary" type="submit">Login</Button>
            }
                                    
            {error && <h4>{error.message}</h4>}
          </form>
          <Button style={{paddingLeft:44, paddingRight:44, marginBottom:20}} size='lg' variant="warning" 
            onClick={() => this.guestSignIn()}>
              Sign In as Guest
          </Button>
          <GoogleButton onClick={this.googleSignIn} /> 
        </div>
        </Container>
      );
    }
  }

  const mapStateToProps=(state: any)=>{
    return{
      isLoggedIn: state.isLoggedIn,
      uid: state.uid,
      isLoading: state.isLoading
    };
  }
  
  const mapDispatchToProps=dispatch=>{
    return{
      setLoginStatus: (val)=>dispatch(actiontypes.setLoginStatus(val)),
      setUserId: (val)=>dispatch(actiontypes.setUserId(val)),
      setCookieLoad: (val)=>dispatch(actiontypes.setCookieLoad(val)),
      setLoading: (val)=>dispatch(actiontypes.setLoading(val)),

    };
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withFirebase(SignInForm)))