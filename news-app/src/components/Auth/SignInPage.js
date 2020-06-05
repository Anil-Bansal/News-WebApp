import React from 'react';
import SignInForm from './SignInForm'
import {Link} from 'react-router-dom';

class SignInPage extends React.Component{

    render(){
        return(
            <div>
                <h1>SignIn</h1>
                <SignInForm />
                <p>
                Dont have an account? <Link to='/'>Sign Up</Link>
                </p>
            </div>
        )
    }
}

export default SignInPage;