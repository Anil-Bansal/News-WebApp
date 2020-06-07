import React from 'react';
import { withFirebase } from '../Firebase';
import {withRouter,useHistory} from 'react-router-dom';
import Button from  'react-bootstrap/Button';


const SignOutButton = (props) => {
  const history = useHistory();

  const signOut= () =>
  {
    props.firebase.doSignOut()
    history.push('/SignIn')
  }

  return (
    <Button variant='danger'
      type='submit' onClick={signOut}>
        Sign Out
    </Button>
  )
}


 
export default withRouter(withFirebase(SignOutButton));