import React from 'react'
import Modal from  'react-bootstrap/Modal'
import Button from  'react-bootstrap/Button'
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share";
import {FaFacebookF,FaTwitter, FaLinkedin} from 'react-icons/fa';
import { withFirebase } from '../Firebase';
import { connect } from 'react-redux';

interface CardData{
    url: string;
    imageurl : string;
    title: string;
    content: string;
    description: string;
}

interface PopupProps{
    cardData: CardData;
    onHide: () => void;
    firebase : {
        addEvent: Function
    }
}  

class Popup extends React.Component<PopupProps>{

    //Open Url in new Window

    goToUrl(url: string): void{
        this.props.firebase.addEvent('visitNewsSite',{url: url});
        window.open(url,'_blank');
    }

    render(){
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    <div data-align = 'center'>
                        {this.props.cardData.title}
                    </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div data-align='center'>
                        <img alt='' style={{height:250, marginBottom:10}} src={this.props.cardData.imageurl}/>
                        <p>
                            {this.props.cardData.content ? 
                                this.props.cardData.content : 
                                this.props.cardData.description}
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{marginRight:190}}>
                        <FacebookShareButton style={{marginRight:20}}
                                url={this.props.cardData.url}
                                quote={this.props.cardData.title}>
                            <FaFacebookF size={23} color='#3b5998'/>
                        </FacebookShareButton >
                        <TwitterShareButton style={{marginRight:20}}
                                url={this.props.cardData.url}
                                title={this.props.cardData.title}>
                            <FaTwitter size={24} color='#00acee'/>
                        </TwitterShareButton>
                        <LinkedinShareButton style={{marginRight:20}}
                                url={this.props.cardData.url}
                                source={this.props.cardData.url}
                                title={this.props.cardData.title }
                                summary={this.props.cardData.description}>
                            <FaLinkedin size={24} color='#0e76a8'/>
                        </LinkedinShareButton>
                    </div>
                    <div style={{marginRight:240}}>
                        <Button  onClick={()=>this.goToUrl(this.props.cardData.url)}>
                            Go To News
                        </Button>
                    </div>
                    <Button variant='danger' 
                            onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default connect(null,null)(withFirebase(Popup));
