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
                Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div align='center'>
                    <h4>{this.props.cardData.title}</h4>
                </div>
                <p>
                {this.props.cardData.description}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        )
    }
}

export default Popup