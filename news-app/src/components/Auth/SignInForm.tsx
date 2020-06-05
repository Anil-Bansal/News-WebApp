import React, { Component } from 'react';
import {withFirebase} from '../Firebase';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actiontypes from '../Redux/Actions';

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
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>
   
          {error && <p>{error.message}</p>}
        </form>
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