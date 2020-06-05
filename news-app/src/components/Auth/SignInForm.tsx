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
    password: '',
    error: null,
  };



class SignInForm extends Component {
	public state: any;
	public props: any;
	public email: any;
	public password: any;
	public error: any;

    constructor(props) {
      super(props);
      this.login=this.login.bind(this)
      this.state = { ...INITIAL_STATE };
    }
  
    login () {
      console.log('test')
     this.props.setLoginStatus(true);
    }
   
    onSubmit = event => {
      const { email, password } = this.state;
   
      this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
          this.login();
          this.setState({ ...INITIAL_STATE });
          this.props.history.push('/Main');
        })
        .catch(error => {
          this.setState({ error });
        });
   
      event.preventDefault();
    };
   
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
   
    render() {
      const { email, password, error } = this.state;
   
      const isInvalid = password === '' || email === '';
   
      return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div align='center'>
          <Avatar >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={this.onSubmit}>
          <div className='row' stle={{marginBottom:20}}>
            <TextField
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
              style={{marginRight:10}}
            />
            <TextField
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </div>
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"/> */}
            <p></p>
            <Button fullWidth variant="contained" color="primary" disabled={isInvalid} type="submit">
              Sign In
            </Button>
            {error && <p>{error.message}</p>}
          </form>
        </div>
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
      setLoginStatus: (val)=>dispatch(actiontypes.setLoginStatus(val))
    };
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withFirebase(SignInForm)))