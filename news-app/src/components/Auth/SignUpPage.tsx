import React from 'react';
import SignUpForm from './SignUpForm'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { StateTypes } from '../Redux/Reducers';
import './Auth.css'

interface Props{
    cookies: Object
}

interface OwnProps{
    cookies: Object
}

class SignUpPage extends React.Component<Props>{

    render(){
        return(
            <div className='Auth'>
                <SignUpForm cookies={this.props.cookies}/>
                <h5 align='center' style={{marginTop:30}}>
                    Already have an account? <Link to='/Signin'>Sign In</Link>
                </h5>
            </div>
        )
    }
}

const mapStateToProps=(state: StateTypes,ownProps: OwnProps)=>{
    return{
     cookies: ownProps.cookies,
    };
  }
  
export default connect(mapStateToProps)(SignUpPage);