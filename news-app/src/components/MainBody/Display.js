import React from 'react';
// import ClipLoader from 'react-spinners/ClipLoader';
// eslint-disable-next-line
import Post from '../Card/Post';
// eslint-disable-next-line
import Card from 'react-bootstrap/Card';
// eslint-disable-next-line
import CardColumns from 'react-bootstrap/CardColumns';

class Display extends React.Component{
    render(){
        const array = this.props.array;
        console.log("load "+this.props.array)
        if(this.props.loading || array===undefined)
        {
            return <div></div>;
        }
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
}

export default Display;
