import React from 'react';
import Card from 'react-bootstrap/Card';


const Post=(props)=>(
    <div >
        <Card style={{ width: '20rem'}} onClick={()=>window.open(props.url,'_blank')  }>
            <Card.Img variant="top" src={props.imageurl} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.description}</Card.Text>
            </Card.Body>    
        </Card>
    </div>    

);

export default Post;