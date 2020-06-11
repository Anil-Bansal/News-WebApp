import React from 'react';
import Display from '../MainBody/Display'
import {connect} from 'react-redux';
import { withFirebase } from '../Firebase';
import { withCookies } from 'react-cookie';
import * as actiontypes from '../Redux/Actions';

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
        {this.props.setLiked([...this.props.liked,this.props.lastLiked])}
        (this.props.cookies).set('testing',[...likedPosts,this.props.lastLiked.url],{path: '/'})
        this.props.firebase.addCookieToDatabase(this.props.uid,[...likedPosts,this.props.lastLiked.url],[...this.props.liked,this.props.lastLiked])
    }
    
    render(){
        return(
            <div>
                <button onClick={() => this.undoUnlike()}>Undo</button>
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
      cookie: ownProps.cookie
    };
  }

const mapDispatchToProps=dispatch=>{
    return{
        setLiked: (val)=>dispatch(actiontypes.setLiked(val)),
        setLastLiked: (val)=>dispatch(actiontypes.setLastLiked(val)),
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(withCookies(withFirebase(Profile)));
  