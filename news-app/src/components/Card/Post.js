import React from 'react';
import Card from 'react-bootstrap/Card';
import Popup from '../Modal/Popup'
import Button from  'react-bootstrap/Button'
import * as Icon from 'react-feather';

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
    goToUrl(url){
        window.open(url,'_blank');
    }

    render(){
    return(
        <div>
            <Card bg={this.state.backg}
                style={{width: '24rem', }}
                text={this.state.textColor}
                onClick={()=>this.setState({modalShow: true})  }>
                <Card.Img 
                    onMouseEnter={this.enter}
                    onMouseLeave={this.leave}
                    variant="top" 
                    src={this.props.imageurl} />
                <Card.Body 
                    onMouseEnter={this.enter}
                    onMouseLeave={this.leave}>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>{this.props.description}</Card.Text>
                </Card.Body>   
                <Card.Footer>
                    <div className='row'>
                        <div align='left' style={{marginLeft:30}}>
                            <Icon.Heart />
                        </div>
                        <div align='right' style={{marginLeft:180}}>
                            <Button variant='danger' onClick={()=>this.goToUrl(this.props.url)}>Go To News</Button>
                        </div>
                    </div>
                </Card.Footer> 

            </Card>
            <Popup show={this.state.modalShow} 
                    onHide={()=> this.setState({modalShow: false})}
                    carddata={this.props}/>
        </div>    
    )}
}

export default Post;