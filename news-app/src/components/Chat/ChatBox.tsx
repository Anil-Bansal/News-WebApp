import React from 'react'
import { withFirebase } from '../Firebase'

class ChatBox extends React.Component{


    render(){
        return(
            <div>
                <Receive>
                </Receive>
                <Send>
                    
                </Send>
            </div>
        )
    }

}

export default withFirebase(ChatBox)