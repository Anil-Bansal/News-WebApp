import React from 'react';
import Card from 'react-bootstrap/Card';
import Popup from '../Modal/Popup'

class Post extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          backg: "light",
          textColor: 'dark',
          modalShow: false
        };
      }

    enter = () =>{
        this.setState({
            backg: "info",
            textColor: 'white'
    })
    }  
    leave = () =>{
        this.setState({
            backg: "light",
            textColor: 'dark'
        })
    }

    render(){
    return(
        <div>
            <Card bg={this.state.backg}
                onMouseEnter={this.enter}
                onMouseLeave={this.leave}
                style={{width: '24rem'}}
                text={this.state.textColor}
                onClick={()=>this.setState({modalShow: true})  }>
                <Card.Img variant="top" src={this.props.imageurl} />
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>{this.props.description}</Card.Text>
                </Card.Body>    
            </Card>
            <Popup show={this.state.modalShow} 
                    onHide={()=> this.setState({modalShow: false})}
                    carddata={this.props}/>
        </div>    
    )}
}

export default Post;