import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import Post from './Post';


const display=(props)=>{
    const array=props.array;
    if(props.loading)
        return <ClipLoader />;
    else{
        return array.map(post=>{
            return <Post title={post.title} imageurl={post.urlToImage} description={post.description} />
        })
    }
}

export default display;