import React from 'react';
// import ClipLoader from 'react-spinners/ClipLoader';
// eslint-disable-next-line
import Post from './Post';
// eslint-disable-next-line
import Card from 'react-bootstrap/Card';
// eslint-disable-next-line
import CardColumns from 'react-bootstrap/CardColumns';

const Display=(props)=>{
    const array=props.array;
    if(props.loading)
        return <div></div>;
    else{
    return(     
        <CardColumns align="center"> 
        {array.map((post,idx) => (
            <Post key={idx}  title={post.title} imageurl={post.urlToImage} description={post.description} url={post.url} />
        ))}
        </CardColumns>
        )
    }
}

export default Display;