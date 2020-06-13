import React from 'react'
import { withFirebase } from '../Firebase'
import Receive from './Receive'
import Send from './Send'
import './Chat.css'
import Splitter from 'm-react-splitters'

class ChatBox extends React.Component{
    render(){
        return(
            <Splitter position="horizontal"
            primaryPaneHeight="80%"
            dispatchResize={true}
            postPoned={true} >
                <div className='messageWindow'>
                    <Receive/>     
                </div>
                <div className='sendArea'>
                    <Send/>
                </div>
            </Splitter>
        )
    }

}

export default withFirebase(ChatBox)
