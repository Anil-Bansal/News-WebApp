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
          this.props.firebase.addCookieToDatabase(this.props.firebase.getUID())
          this.props.setUserId(this.props.firebase.getUID());
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
        <div align='center' style={{marginTop:50}}>
          <Avatar >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" style={{marginBottom:30}}>
            Sign In
          </Typography>
          <form onSubmit={this.onSubmit}>
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
                  style={{marginBottom:20}}
            />
          </div>
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"/> */}
            <Button fullWidth variant="contained" color="primary" disabled={isInvalid} type="submit">
              Sign In
            </Button>
            {error && <h4>{error.message}</h4>}
          </form>
        </div>
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
      setUserId: (val)=>dispatch(actiontypes.setUserId(val))
    };
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withFirebase(SignInForm)))