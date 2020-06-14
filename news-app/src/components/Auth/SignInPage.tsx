import React from 'react';
import SignInForm from './SignInForm'
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

class SignInPage extends React.Component<Props>{

    render(){
        return(
            <div className='Auth'>
                <SignInForm cookies={this.props.cookies}/>
                <h5 align='center' style={{marginTop:30}}>
                    Dont have an account? <Link to='/'>Sign Up</Link>
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
  
export default connect(mapStateToProps)(SignInPage);