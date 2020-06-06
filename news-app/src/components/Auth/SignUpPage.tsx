import React from 'react';
import SignUpForm from './SignUpForm'
import {Link} from 'react-router-dom';

class SignUpPage extends React.Component{

    render(){
        return(
            <div>
                <SignUpForm />
                <h5 align='center' style={{marginTop:30}}>
                Already have an account? <Link to='/Signin'>Sign In</Link>
                </h5>
            </div>
        )
    }
}

export default SignUpPage;