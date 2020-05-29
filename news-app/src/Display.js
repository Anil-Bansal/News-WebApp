import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import Post from './Post';
// import Card from 'react-bootstrap/Card';


const Display=(props)=>{
    const array=props.array;
    if(props.loading)
        return <ClipLoader />;
    else{
    return(     
            array.map(post=>{ 
                    return <Post title={post.title} imageurl={post.urlToImage} description={post.description} />
                })
        )
        // <Card.Group> 
        // {array.map((card) => (
        //     <Card
        //     // key={card.id} // Make sure you use a unique key identifier for React
        //     image={card.urlToImage} 
        //     title={card.title}
        //     description={card.description}
        //     />
        // ))}
        // </Card.Group>
        // )
    }
}

export default Display;