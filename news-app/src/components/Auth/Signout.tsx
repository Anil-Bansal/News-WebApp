import React from 'react';
import { withFirebase } from '../Firebase';
import {withRouter,useHistory} from 'react-router-dom';

const SignOutButton = (props) => {
  const history = useHistory();

  const signOut= () =>
  {
    props.firebase.doSignOut()
    history.push('/SignIn')
  }

  return (
    <button variant='danger' type="button" onClick={signOut}>
      Sign Out
  </button>
  )
}


 
export default withRouter(withFirebase(SignOutButton));