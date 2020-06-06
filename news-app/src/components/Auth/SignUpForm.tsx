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
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';


const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class SignUpForm extends Component {
	public state: any;
	public INITIAL_STATE: any;
	public props: any;
	public email: any;
	public passwordOne: any;
	public passwordTwo: any;
	public error: any;

    constructor(props) {
      super(props);
      this.state={...this.INITIAL_STATE};
    }

    login () {
        console.log('tesd')
        this.props.setLoginStatus(true);
       }

    onSubmit = event => {
      const { email, passwordOne } = this.state;
   
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          this.login(true);
          this.setState({ ...INITIAL_STATE });
          this.props.firebase.addNewUser(this.props.firebase.getUID());
          this.props.setlikedurl([]);
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
  
      var isInvalid =
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
              <Button fullWidth variant="contained" color="primary" disabled={isInvalid} type="submit">Sign Up</Button>
  
              {error && <h5 style={{marginTop:10}}>{error.message}</h5>}
          </form>
        </div></div>
        </Container>

      );
    }
  }


  const mapStateToProps=state=>{
    return{
      isLoggedIn: state.isLoggedIn
    };
  }
  
  const mapDispatchToProps=dispatch=>{
    return{
      setLoginStatus: (val)=>dispatch(actiontypes.setLoginStatus(val)),
      setlikedurl: (val)=>dispatch(actiontypes.setlikedurl(val))
    };
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withFirebase(SignUpForm)))