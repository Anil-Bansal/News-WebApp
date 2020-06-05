import React, { Component } from 'react';
import {withFirebase} from '../Firebase';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actiontypes from '../Redux/Actions';

const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class SignUpForm extends Component {
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
        <div>
          <form onSubmit={this.onSubmit}>
              <input
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
              />
              <input
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
              />
              <input
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm Password"
              />
              <button disabled={isInvalid} type="submit">Sign Up</button>
  
              {error && <p>{error.message}</p>}
          </form>
        </div>
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
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withFirebase(SignUpForm)))