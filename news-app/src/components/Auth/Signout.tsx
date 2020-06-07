import React from 'react';
import * as actiontypes from '../Redux/Actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
 
import { withFirebase } from '../Firebase';
 
class SignOutButton extends React.Component{
  constructor(props){
    super(props);
    this.onclickchange=this.onclickchange.bind(this);
  }

  onclickchange(){
    this.props.setLoginStatus(false);
    this.props.firebase.doSignOut();
    this.props.history.push('/');
  }

  render(){
      return(
      <button type="button" onClick={this.onclickchange}>
          Sign Out
      </button>
    );
  }
}

const mapStateToProps=(state: Object)=>{
  return{
    isLoggedIn: state.isLoggedIn
  };
}

const mapDispatchToProps=dispatch=>{
  return{
    setLoginStatus: (val)=>dispatch(actiontypes.setLoginStatus(val)),
  };
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withFirebase(SignOutButton)))