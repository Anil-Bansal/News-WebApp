import React from 'react';
import SignInForm from './SignInForm'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class SignInPage extends React.Component{

    render(){
        return(
            <div>
                <SignInForm cookies={this.props.cookies}/>
                <h5 align='center' style={{marginTop:30}}>
                Dont have an account? <Link to='/'>Sign Up</Link>
                </h5>
            </div>
        )
    }
}

const mapStateToProps=(state: Object,ownProps: Object)=>{
    return{
     cookies: ownProps.cookies,
    };
  }
  
export default connect(mapStateToProps)(SignInPage);