import React from 'react';
import Card from 'react-bootstrap/Card';

class SourceCard extends React.Component{
	public state: Object;
	public props: any;

    constructor(props: any) {
        super(props);
        this.state = {
          BackgroundColor: "light",
          textColor: 'dark'
        };
      }

    enter = () =>{
        this.setState({
            BackgroundColor: "info",
            textColor: 'white'
    })
    }  
    leave = () =>{
        this.setState({
            BackgroundColor: "light",
            textColor: 'dark'
        })
    }  
    render(){
        return(
            <div>
                <Card bg={this.state.BackgroundColor}
                    onMouseEnter={this.enter}
                    onMouseLeave={this.leave}
                    style={{width: '24rem'}}
                    text={this.state.textColor}
                    onClick={()=>window.open(this.props.url,'_blank')  }>
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>{this.props.description}</Card.Text>
                    </Card.Body>    
                </Card>
            </div>    
        )}
}

export default SourceCard;