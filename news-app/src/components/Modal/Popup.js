import React from 'react'
import Modal from  'react-bootstrap/Modal'
import Button from  'react-bootstrap/Button'
import * as Icon from 'react-feather';

class Popup extends React.Component{

    handleFacebookClick(){
        window.open('http://www.facebook.com','_blank');
    }

    handleInstagramClick(){
        window.open('http://www.instagram.com','_blank');
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
                    {this.props.cardData.title}
                </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div align='center'>
                    <img alt='' style={{height:250, marginBottom:10}} src={this.props.cardData.imageurl}/>
                
                <p>
                    {this.props.cardData.content ? this.props.cardData.content : this.props.cardData.description}
                </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Icon.Facebook onClick={()=>this.handleFacebookClick()} />
                <Icon.Instagram onClick={()=>this.handleInstagramClick()} />    
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        )
    }
}

export default Popup