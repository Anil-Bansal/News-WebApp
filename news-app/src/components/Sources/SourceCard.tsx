import React from 'react';
import Card from 'react-bootstrap/Card';

interface State{
    backgroundColor: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'
    textColor: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'white' | 'muted'
}
interface SourceCardProps{
    key: number
    url: string
    name: string
    description: string
}

class SourceCard extends React.Component<SourceCardProps>{
    public state: State

    constructor(props: SourceCardProps) {
        super(props);
        this.state = {
          backgroundColor: "light",
          textColor: 'dark'
        };
      }

    
    //Set Background and Text Color on Post Enter

    enter = () =>{
        this.setState({
            backgroundColor: "info",
            textColor: 'white'
        })
    }  

    //Set Background and Text Color on Post Leave

    leave = () =>{
        this.setState({
            backgroundColor: "light",
            textColor: 'dark'
        })
    }

    render(){
        return(
            <div>
                <Card bg={this.state.backgroundColor}
                    onMouseEnter={this.enter}
                    onMouseLeave={this.leave}
                    style={{width: '80%'}}
                    text={this.state.textColor}
                    onClick={()=>window.open(this.props.url,'_blank')}>
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>{this.props.description}</Card.Text>
                    </Card.Body>    
                </Card>
            </div>    
        )
    }
}

export default SourceCard;