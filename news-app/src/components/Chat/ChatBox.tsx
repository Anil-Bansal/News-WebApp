import React from 'react'
import { withFirebase } from '../Firebase'
import Receive from './Receive'
import Send from './Send'
import './Chat.css'
import SplitPane from 'react-split-pane'

class ChatBox extends React.Component{

    render(){
        return(
            <SplitPane split="horizontal" default={300}>
                <div className='messageWindow'>
                    <Receive/>     
                </div>
                <div className='sendArea'>
                    <Send/>
                </div>
            </SplitPane>
        )
    }

}

export default withFirebase(ChatBox)
