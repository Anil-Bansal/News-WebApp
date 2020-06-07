import React, { Component } from 'react';
import {withFirebase} from '../Firebase';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actiontypes from '../Redux/Actions';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from 'react-bootstrap/Button'
import CssBaseline from '@material-ui/core/CssBaseline';
import GoogleButton from 'react-google-button';

const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class SignUpForm extends Component {
	public state: any;
	public props: any;
	public email: any;
	public passwordOne: any;
	public passwordTwo: any;
	public error: any;

    constructor(props) {
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
        var uid = await this.props.firebase.getUID()
        console.log(uid)
        this.props.setUserId(uid);
        var cookies = await this.props.firebase.getCookieFromDatabase(uid)
        this.props.cookies.set('testing',cookies,{path: '/'});
        this.props.setCookieLoad(true)
      }

      guestSignIn = () => {
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
          this.setState({ error });
        });
      }

      async guestLogin()
      {
        var uid = await this.props.firebase.getUID()
        this.props.setUserId(uid);
        this.props.setCookieLoad(true)
      }

       googleSignIn = () => {
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
          this.setState({ error });
        });
      }

    onSubmit = event => {
      const { email, passwordOne } = this.state;
   
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          this.login(true);
          this.setState({ ...INITIAL_STATE });
          this.props.setUserId(this.props.firebase.getUID());
          this.props.firebase.addNewUser(this.props.firebase.getUID());
          this.props.cookies.set('testing',[],{path: '/'});
          this.props.history.push('/Main');
        })
        .catch(error => {
          this.setState({ error });
        });
   
      event.preventDefault();
    }
   
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
   
    render() {
      const {
          email,
          passwordOne,
          passwordTwo,
          error,
      } = this.state;
  
      const isInvalid = 
              passwordOne !== passwordTwo || 
              passwordOne === '' || 
              email === '';
  
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
        <div>
          <form onSubmit={this.onSubmit}>
            <div align='center'>
              <TextField
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
                  variant="outlined"
                  style={{marginBottom:20}}
              />
              <TextField
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                  variant="outlined"
                  style={{marginBottom:20}}
              />
              <TextField
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm Password"
                  variant="outlined"
                  style={{marginBottom:20}}
              />
              </div>
            {isInvalid ? 
                <Button style={{marginBottom:20}} size='lg' variant="secondary" disabled>Register</Button>
              : <Button style={{marginBottom:20}} size='lg' variant="primary" type="submit">Register</Button>
            }
  
              {error && <h5 style={{marginTop:10}}>{error.message}</h5>}
          </form>

          <Button style={{paddingLeft:44, paddingRight:44, marginBottom:20}} size='lg' variant="warning" onClick={() => this.guestSignIn()}>
              Sign Up as Guest
          </Button>
          <GoogleButton onClick={this.googleSignIn} />
        </div></div>
        </Container>

      );
    }
  }



  const mapStateToProps=state=>{
    return{
      isLoggedIn: state.isLoggedIn,
      uid: state.uid
    };
  }
  
  const mapDispatchToProps=dispatch=>{
    return{
      setLoginStatus: (val)=>dispatch(actiontypes.setLoginStatus(val)),
      setUserId: (val)=>dispatch(actiontypes.setUserId(val)),
      setCookieLoad: (val)=>dispatch(actiontypes.setCookieLoad(val))
    };
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withFirebase(SignUpForm)))