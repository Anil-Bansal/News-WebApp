import React from 'react';
import Display from '../MainBody/Display'
import { render } from '@testing-library/react';

class Profile extends React.Component{
    render(){
        return(
            <Display show='likedOnly' cookies={this.props.cookies}/>
        )
    }
}
  
export default Profile
  