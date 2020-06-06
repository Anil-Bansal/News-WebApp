import React from 'react';
import SignInForm from './SignInForm'
import {Link} from 'react-router-dom';

class SignInPage extends React.Component{

    render(){
        return(
            <div>
                <SignInForm />
                <h5 align='center' style={{marginTop:30}}>
                Dont have an account? <Link to='/'>Sign Up</Link>
                </h5>
            </div>
        )
    }
}

export default SignInPage;