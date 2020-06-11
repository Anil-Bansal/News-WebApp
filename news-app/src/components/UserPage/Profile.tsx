import React from 'react';
import Display from '../MainBody/Display'
import {connect} from 'react-redux';
import { withFirebase } from '../Firebase';
import { withCookies } from 'react-cookie';
import * as actiontypes from '../Redux/Actions';
import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button'

interface ProfileProps{
    cookies: Object
}

class Profile extends React.Component<ProfileProps>{

    constructor(props: Props) {
        super(props);
        this.undoUnlike=this.undoUnlike.bind(this)
      }
  
    undoUnlike () {
        var likedPosts: Array<string> = (this.props.cookies).get('testing');
        this.props.setToast(false);
        {this.props.setLiked([...this.props.liked,this.props.lastLiked])}
        (this.props.cookies).set('testing',[...likedPosts,this.props.lastLiked.url],{path: '/'})
        this.props.firebase.addCookieToDatabase(this.props.uid,[...likedPosts,this.props.lastLiked.url],[...this.props.liked,this.props.lastLiked])
    }
    
    removeToast = () => this.props.setToast(false)

    render(){
        return(
            <div align='center'>                
                <Toast show={this.props.showToast} onClose={this.removeToast} delay={3000} autohide>
                    <Toast.Header align='center'>
                        <h5>Undo Last UnLike???</h5>
                        <Button variant='danger' size='sm' style={{marginLeft:20,marginRight:20}} 
                                onClick={() => this.undoUnlike()}>Undo</Button>
                    </Toast.Header>
                </Toast>
                <Display show='likedOnly' cookies={this.props.cookies}/>
            </div>
        )
    }
}

const mapStateToProps=(state,ownProps)=>{
    return{
      lastLiked: state.lastLiked,
      liked: state.liked,
      uid: state.uid,
      cookie: ownProps.cookie,
      showToast: state.showToast
    };
  }

const mapDispatchToProps=dispatch=>{
    return{
        setLiked: (val)=>dispatch(actiontypes.setLiked(val)),
        setLastLiked: (val)=>dispatch(actiontypes.setLastLiked(val)),
        setToast: (val)=>dispatch(actiontypes.setToast(val)),
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(withCookies(withFirebase(Profile)));
  