import React from 'react';
import { withFirebase } from '../Firebase';
import {withRouter,useHistory} from 'react-router-dom';
import Button from  'react-bootstrap/Button';
import {connect} from 'react-redux';
import * as actiontypes from '../Redux/Actions';

class SignOutButton extends React.Component{
  constructor(props){
    super(props);
    this.signOut=this.signOut.bind(this);
  }

  signOut(){
    this.props.firebase.doSignOut();
    this.props.setLoginStatus(false);
    this.props.setUserId(null);
    this.props.setCookieLoad(false);
    this.props.history.push('/SignIn');
  }

  render(){
    return (
      <Button variant='danger'
        type='submit' onClick={this.signOut}>
          Sign Out
      </Button>
    )
  }

}


const mapStateToProps=(state: Object)=>{
  return{
    isLoggedIn: state.isLoggedIn,
    uid: state.uid,
  };
}

const mapDispatchToProps=dispatch=>{
  return{
    setLoginStatus: (val)=>dispatch(actiontypes.setLoginStatus(val)),
    setUserId: (val)=>dispatch(actiontypes.setUserId(val)),
    setCookieLoad: (val)=>dispatch(actiontypes.setCookieLoad(val))
  };
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withFirebase(SignOutButton)));