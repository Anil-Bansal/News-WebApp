import React from 'react'
import { withFirebase } from '../Firebase'

class ChatBox extends React.Component{


    render(){
        return(
            <div>
                <Receive/>                    
                <Send/>
            </div>
        )
    }

}

export default withFirebase(ChatBox)
