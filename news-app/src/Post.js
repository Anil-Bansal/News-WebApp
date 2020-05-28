import React from 'react';
import Card from 'react-bootstrap/Card';

const post=(props)=>(
    <Card>
        <Card.Img variant="top" src={props.imageurl} />
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.description}</Card.Text>
        </Card.Body>    
    </Card>
);

export default post;