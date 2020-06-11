import React from 'react'
import { withFirebase } from '../Firebase'
import Receive from './Receive'
import Send from './Send'

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
