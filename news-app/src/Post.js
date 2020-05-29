import React from 'react';
import Card from 'react-bootstrap/Card';

const Post=(props)=>(
    <Card style={{ width: '20rem' ,display: 'flex'}}>
        <Card.Img variant="top" src={props.imageurl} />
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.description}</Card.Text>
        </Card.Body>    
    </Card>
);

export default Post;