import React, { Component } from 'react';
import {withFirebase} from '../src/components/Firebase';
import {Link,withRouter} from 'react-router-dom';
const SignUpPage = () => (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );

const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };
 
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state={...this.INITIAL_STATE};
  }
 
  onSubmit = event => {
    const { email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
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
        <h1>Sign Up Form</h1>
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

const SignUpLink = () => (
    <p>
      Dont have an account? <Link to='/'>Sign Up</Link>
    </p>
  );

const SignUpForm=withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;
export{ SignUpForm,SignUpLink};