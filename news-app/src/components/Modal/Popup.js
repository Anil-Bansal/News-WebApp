import React from 'react'
import Modal from  'react-bootstrap/Modal'
import Button from  'react-bootstrap/Button'
import * as Icon from 'react-feather';
import { FacebookShareButton, FacebookIcon } from "react-share";
class Popup extends React.Component{

    handleFacebookClick(){
        window.open('http://www.facebook.com','_blank');
    }

    handleInstagramClick(){
        window.open('http://www.instagram.com','_blank');
    }

    goToUrl(url){
        //console.log(url);
        window.open(url,'_blank');
    }

    render(){
        return(
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                <div align = 'center'>
                    {this.props.carddata.title}
                </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div align='center'>
                    <img alt='' style={{height:250, marginBottom:10}} src={this.props.carddata.imageurl}/>
                
                <p>
                    {this.props.carddata.content ? this.props.carddata.content : this.props.carddata.description}
                </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <FacebookShareButton
                    url="http://www.facebook.com"
                    quote={this.props.carddata.title}>
                    <FacebookIcon logoFillColor="white" />
                </FacebookShareButton>
                <Icon.Instagram onClick={()=>this.handleInstagramClick()} />    
                <Button onClick={()=>this.goToUrl(this.props.carddata.url)}>Go To News</Button>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        )
    }
}

export default Popup