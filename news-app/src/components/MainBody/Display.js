import React from 'react';
import Post from '../Card/Post';
import {connect} from 'react-redux';
import CardColumns from 'react-bootstrap/CardColumns';

class Display extends React.Component{
    
    render(){
        const array = this.props.articles;
        if(this.props.is_loading || array===undefined)
        {
            return <div></div>;
        }
        else{

        return(     
            
            <CardColumns align="center"> 
            {array.map((post,idx) => (
                <Post key={idx}  title={post.title} imageurl={post.urlToImage} description={post.description} url={post.url} content={post.content} cookies={this.props.cookies}/>
            ))}
            </CardColumns>
            )
        }
    }
}
const mapStateToProps=state=>{
    return{
      is_loading: state.is_loading,
      articles: state.articles,
    };
  }
    
  export default connect(mapStateToProps)(Display);
