import React from 'react';
import Display from '../MainBody/Display'
import {connect} from 'react-redux';
import { withFirebase } from '../Firebase';
import { withCookies } from 'react-cookie';
import * as actiontypes from '../Redux/Actions';
import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button'
import {NewsPost} from '../Card/Post';
import {StateTypes} from '../Redux/Reducers';
import './Profile.css'

interface Cookie{
    get: Function,
    set: Function
}

interface Props{
    setToast: Function,
    cookies: Cookie,
    setLiked: Function,
    liked: Array<NewsPost>,
    lastLiked: NewsPost,
    firebase: any,
    uid: string,
    showToast: boolean
}

class Profile extends React.Component<Props>{

    constructor(props: Props) {
        super(props);
        this.undoUnlike=this.undoUnlike.bind(this)
      }


    componentDidMount(){
        window.scrollTo(0, 0);
    }
  
    undoUnlike () {
        var likedPosts: Array<string> = (this.props.cookies).get('testing');
        this.props.setToast(false);
        // eslint-disable-next-line
        {this.props.setLiked([...this.props.liked,this.props.lastLiked])}
        (this.props.cookies).set('testing',[...likedPosts,this.props.lastLiked.url],{path: '/'})
        this.props.firebase.addCookieToDatabase(this.props.uid,[...likedPosts,this.props.lastLiked.url],[...this.props.liked,this.props.lastLiked])
    }
    
    removeToast = () => this.props.setToast(false)

    render(){
        return(
            <div align='center' className='profileBody'>                
                <Toast className='toastUndo' show={this.props.showToast} onClose={this.removeToast} delay={3000} autohide>
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

const mapStateToProps=(state: StateTypes,ownProps: any)=>{
    return{
      lastLiked: state.lastLiked,
      liked: state.liked,
      uid: state.uid,
      cookie: ownProps.cookie,
      showToast: state.showToast
    };
  }

const mapDispatchToProps=(dispatch: any)=>{
    return{
        setLiked: (val: Array<NewsPost>)=>dispatch(actiontypes.setLiked(val)),
        setLastLiked: (val: NewsPost)=>dispatch(actiontypes.setLastLiked(val)),
        setToast: (val: boolean)=>dispatch(actiontypes.setToast(val)),
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(withCookies(withFirebase(Profile)));
  