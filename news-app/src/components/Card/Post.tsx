import React from 'react';
import Card from 'react-bootstrap/Card';
import Popup from '../Modal/Popup'
import Button from  'react-bootstrap/Button'
import {MdFavoriteBorder,MdFavorite} from 'react-icons/md'
import {withFirebase} from '../Firebase';
import {connect} from 'react-redux';
import './Post.css';
import * as actiontypes from '../Redux/Actions';



class Post extends React.Component{
    public state: Object;

    constructor(props: any) {
        super(props);
        this.state = {
          backg: "light",
          textColor: 'dark',
          modalShow: false,
          isLiked: ((this.props.cookies).get('testing')).includes(this.props.url),
          postData:{
                title: this.props.title,
                description: this.props.description,
                imageurl: this.props.urlToImage,
                url: this.props.url
                }
        };
      }
    enter = () =>{
        this.setState({backg: "info",textColor: 'white'})
    }  
    
    leave = () =>{
        this.setState({backg: "light",textColor: 'dark'})
    }

    goToUrl(url){
        window.open(url,'_blank');
    }

    likePost = () => {
        this.props.firebase.addCookieToDatabase(this.props.uid,
                                            [...(this.props.cookies).get('testing'),this.props.url],
                                            [...(this.props.liked),this.state.postData]);
        (this.props.cookies).set('testing',[...(this.props.cookies).get('testing'),this.props.url]);
        this.setState({isLiked: true});
        this.props.setLiked([...this.props.liked,this.state.postData])
    }

    unlikePost = () => {
        var likedPosts: Array<string> = (this.props.cookies).get('testing')
        var likedPostsComplete = this.props.liked
        const index: number = likedPosts.indexOf(this.props.url);
        if (index > -1) {
            likedPosts.splice(index, 1);
            likedPostsComplete.splice(index, 1);
        }
        (this.props.cookies).set('testing',likedPosts)
        this.props.firebase.addCookieToDatabase(this.props.uid,likedPosts,likedPostsComplete)
        this.setState({isLiked: false})        
    }

    render(){
    return(
        <div>
            <Card bg={this.state.backg}
                style={{width: '24rem', }}
                text={this.state.textColor}
                className='Card'
                >
                <Card.Img 
                    onMouseEnter={this.enter}
                    onMouseLeave={this.leave}
                    variant="top" 
                    src={this.props.imageurl}
                    onClick={()=>this.setState({modalShow: true})} />
                <Card.Body 
                    onMouseEnter={this.enter}
                    onMouseLeave={this.leave}
                    onClick={()=>this.setState({modalShow: true})}>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>{this.props.description}</Card.Text>
                </Card.Body>   
                <Card.Footer>
                    <div className='row'>
                        <div align='left' style={{marginLeft:30}}>
                            {this.state.isLiked ? 
                                    <MdFavorite color='#C70039' size={30} onClick={()=> this.unlikePost()}/> : 
                                    <MdFavoriteBorder color='#C70039' size={30} onClick={()=> this.likePost()}/> }
                        </div>
                        <div align='right' style={{marginLeft:180}}>
                            <Button variant='danger' onClick={()=>this.goToUrl(this.props.url)}>Go To News</Button>
                        </div>
                    </div>
                </Card.Footer> 

            </Card>
            <Popup show={this.state.modalShow} 
                    onHide={()=> this.setState({modalShow: false})}
                    cardData={this.props}/>
        </div>    
    )}
}


const mapStateToProps=(state: any)=>{
    return{
      isLoggedIn: state.isLoggedIn,
      uid: state.uid,
      liked: state.liked
    };
  }
  
const mapDispatchToProps=dispatch=>{
    return{
        setLoginStatus: (val)=>dispatch(actiontypes.setLoginStatus(val)),
        setUserId: (val)=>dispatch(actiontypes.setUserId(val)),
        setLiked: (val)=>dispatch(actiontypes.setLiked(val))
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(withFirebase(Post))