import React from 'react'
import Modal from  'react-bootstrap/Modal'
import Button from  'react-bootstrap/Button'


class Popup extends React.Component{
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
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        )
    }
}

export default Popup