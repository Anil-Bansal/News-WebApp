import React from 'react';
import Post from '../Card/Post';
import {connect} from 'react-redux';
import CardColumns from 'react-bootstrap/CardColumns';

class Display extends React.Component{
	public props: any;

    render(){
        const array: Array<Object> = this.props.articles;
        if(this.props.is_loading || array===undefined)
        {
            return <div></div>;
        }
        else{

        return(     
            
            <CardColumns align="center"> 
            {array.map((post: Object,idx: Number) => (
                <Post key={idx} title={post.title} imageurl={post.urlToImage} description={post.description} url={post.url} content={post.content} cookies={this.props.cookies}/>
            ))}
            </CardColumns>
            )
        }
    }
}
const mapStateToProps=(state: Object)=>{
    return{
      is_loading: state.is_loading,
      articles: state.articles,
    };
  }
    
  export default connect(mapStateToProps)(Display);
