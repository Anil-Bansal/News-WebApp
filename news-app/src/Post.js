import React from 'react';
import Card from 'react-bootstrap/Card';
// import "./Post.css"
// const styles = {
//     myStyle: {
//             '& a': {
//                 border: 'dark',
//                 width:'20rem'
//             },
//             '& a:hover': {
//             border: 'danger',
//             width: '20rem'
//         },
//     }
// };

const Post=(props)=>(
    <div>
        <Card style={{width: '24rem'}} onClick={()=>window.open(props.url,'_blank')  }>
            <Card.Img variant="top" src={props.imageurl} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.description}</Card.Text>
            </Card.Body>    
        </Card>
    </div>    

);

export default Post;