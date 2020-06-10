import React from "react";
import { withFirebase } from "../Firebase";
import * as actiontypes from '../Redux/Actions';
import {connect} from 'react-redux';
import { StateTypes } from "../Redux/Reducers";
import Send from "./Send";
import Receive from "./Receive";


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



export default ChatBox;