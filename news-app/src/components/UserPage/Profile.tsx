import React from 'react';
import Display from '../MainBody/Display'

class Profile extends React.Component{
    render(){
        return(
            <Display show='likedOnly' cookies={this.props.cookies}/>
        )
    }
}
  
export default Profile
  