import React from 'react';
import Card from 'react-bootstrap/Card';
import Popup from '../Modal/Popup'
import Button from  'react-bootstrap/Button'
import {MdFavoriteBorder,MdFavorite} from 'react-icons/md'
import {withFirebase} from '../Firebase';
import {connect} from 'react-redux';
import './Post.css';
import * as actiontypes from '../Redux/Actions';
import { StateTypes } from '../Redux/Reducers';

export interface NewsPost{
    title: string;
    urlToImage: string;
    description: string;
    url: string;
    cookies: Object;
    content: string;
    imageurl: String
    name: string;
}

interface Cookie{
    get: Function,
    set: Function
}

interface Props{
    cookies: Cookie,
    url: string,
    title: string,
    description: string,
    imageurl: string,
    uid: string,
    liked: Array<NewsPost>,
    setLiked: Function,
    show: string,
    firebase: any,
    setLastLiked: Function,
    setToast: Function
}

interface State{
    backgroundColor: string,
    textColor: string,
    modalShow: boolean,
    isLiked: boolean
}

export interface PostData{
    title: string,
    description: string,
    urlToImage: string,
    url: string
}

class Post extends React.Component<Props>{
    public state: {
        code: number,
        modalShow: boolean,
        isLiked: boolean,
        backgroundColor: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'
        textColor: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'white' | 'muted'
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            backgroundColor: "light",
            textColor: 'dark',
            modalShow: false,
            code: 0,
            isLiked: ((this.props.cookies).get('testing')).includes(this.props.url) || this.props.show==='likedOnly',
        };
        this.enter=this.enter.bind(this);
        this.leave=this.leave.bind(this);
        this.likePost=this.likePost.bind(this);
        this.unlikePost=this.unlikePost.bind(this);
    }

    enter = () =>{
        this.setState({backgroundColor: "info",textColor: 'white'})
    }  
    
    leave = () =>{
        this.setState({backgroundColor: "light",textColor: 'dark'})
    }

    goToUrl(url: string){
        this.props.firebase.addEvent('visitNewsSite',{url: url});
        window.open(url,'_blank');
    }

    likePost = (postData: PostData) => {
        this.props.firebase.addCookieToDatabase(this.props.uid,
                    [...(this.props.cookies).get('testing'),this.props.url],
                    [...(this.props.liked),postData]);
        this.props.cookies.set('testing',
                    [...(this.props.cookies).get('testing'),
                    this.props.url]);
        this.setState({isLiked: true});
        this.props.setLiked([...this.props.liked,Object.assign({}, postData)]);
        this.props.firebase.addEvent('likePost',{url: this.props.url} );
    }

    unlikePost = (postData: PostData) => {
        var likedPosts: Array<string> = (this.props.cookies).get('testing')
        var likedPostsComplete = this.props.liked
        const urlCurrent = this.props.url
        const index: number = likedPosts.indexOf(urlCurrent);
        if (index > -1) {
            likedPosts.splice(index, 1);
        }
        likedPostsComplete = likedPostsComplete.filter(function( obj ) {
            return obj.url !== urlCurrent;
        });
        (this.props.cookies).set('testing',likedPosts,{path: '/'})
        this.props.setLiked([...likedPostsComplete])
        this.props.firebase.addCookieToDatabase(this.props.uid,likedPosts,likedPostsComplete)
        this.setState({...this.state,
                    isLiked: false})        
        this.props.setLastLiked(postData)
        this.props.setToast(true)
        this.props.firebase.addEvent('unlikePost',{url: urlCurrent} );
    }

    renderModal(){
        switch(this.state.code){
            case 1:
            {
                return (
                    <Popup show={this.state.modalShow} 
                        onHide={()=> this.setState({modalShow: false})}
                        cardData={this.props}/>
                )
            }
            default:
                return <div />
        }
    }

    render(){
        var postData= {
            title: this.props.title,
            description: this.props.description,
            urlToImage: this.props.imageurl,
            url: this.props.url
        }
        return(
            <div>
                <Card bg={this.state.backgroundColor}
                    style={{width: '24rem' }}
                    text={this.state.textColor}
                    className='Card'>
                    <Card.Img 
                        onMouseEnter={this.enter}
                        onMouseLeave={this.leave}
                        variant="top" 
                        src={this.props.imageurl}
                        onClick={()=>{
                            this.props.firebase.addEvent('viewModal',{url: this.props.url});
                            this.setState({modalShow: true});
                            this.setState({code: 1})}} />
                    <Card.Body 
                        onMouseEnter={this.enter}
                        onMouseLeave={this.leave}
                        onClick={()=>{
                            this.props.firebase.addEvent('viewModal',{url: this.props.url});
                            this.setState({modalShow: true});
                            this.setState({code: 1})}} >
                        <Card.Title>
                            {this.props.title}
                        </Card.Title>
                        <Card.Text>
                            <p className="card-text">
                                {this.props.description ? this.props.description.slice(0,125) : ""}
                            </p>
                        </Card.Text>
                    </Card.Body>   
                    <Card.Footer>
                        <div className='row'>
                            <div data-align='left' style={{marginLeft:30}}>
                                {this.state.isLiked || this.props.show==='likedOnly' ? 
                                        <MdFavorite color='#C70039' 
                                                    size={30} 
                                                    onClick={()=> this.unlikePost(postData)}/> : 
                                        <MdFavoriteBorder color='#C70039' 
                                                    size={30} 
                                                    onClick={()=> this.likePost(postData)}/> }
                            </div>
                            <div data-align='right' 
                                style={{marginLeft:'35%'}}>
                                <Button variant='danger' 
                                        onClick={()=>this.goToUrl(this.props.url)}>
                                            Go To News
                                </Button>
                            </div>
                        </div>
                    </Card.Footer> 
                </Card>
                {this.renderModal()}
            </div>    
        )
    }
}


const mapStateToProps=(state: StateTypes)=>{
    return{
        isLoggedIn: state.isLoggedIn,
        uid: state.uid,
        liked: state.liked,
    };
}
  
const mapDispatchToProps=(dispatch: any)=>{
    return{
        setLoginStatus: (val: boolean)=>dispatch(actiontypes.setLoginStatus(val)),
        setUserId: (val: string)=>dispatch(actiontypes.setUserId(val)),
        setLiked: (val: Array<NewsPost>)=>dispatch(actiontypes.setLiked(val)),
        setLastLiked: (val: NewsPost)=>dispatch(actiontypes.setLastLiked(val)),
        setToast: (val: boolean)=>dispatch(actiontypes.setToast(val))
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(withFirebase(Post))