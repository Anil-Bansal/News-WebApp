import React from 'react';
import SignUpForm from './SignUpForm'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class SignUpPage extends React.Component{

    render(){
        return(
            <div>
                <SignUpForm cookies={this.props.cookies}/>
                <h5 align='center' style={{marginTop:30}}>
                Already have an account? <Link to='/Signin'>Sign In</Link>
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
  
export default connect(mapStateToProps)(SignUpPage);