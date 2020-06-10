import React from 'react';
import Display from '../MainBody/Display'

interface ProfileProps{
    cookies: Object
}

class Profile extends React.Component<ProfileProps>{
    render(){
        return(
            <Display show='likedOnly' cookies={this.props.cookies}/>
        )
    }
}
  
export default Profile
  