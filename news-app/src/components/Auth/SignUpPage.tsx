import React from 'react';
import SignUpForm from './SignUpForm'
import {Link} from 'react-router-dom';

class SignUpPage extends React.Component{

    render(){
        return(
            <div>
                <h1>SignUp</h1>
                <SignUpForm />
                <p>
                Already have an account? <Link to='/Signin'>Sign IN</Link>
                </p>
            </div>
        )
    }
}

export default SignUpPage;