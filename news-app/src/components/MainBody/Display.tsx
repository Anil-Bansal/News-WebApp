import React from 'react';
import Post from '../Card/Post';
import {connect} from 'react-redux';

class Display extends React.Component{
	public props: any;

    render(){
        const array: Array<Object> = this.props.articles;
        let content:Array = [];
        array.forEach((post: Object,idx: Number) => {
            content.push(
                <div className="col-sm py-3" key={idx}>
                    <Post key={idx} 
                        title={post.title} 
                        imageurl={post.urlToImage} 
                        description={post.description} 
                        url={post.url} 
                        content={post.content} 
                        cookies={this.props.cookies}/>
                </div>
            )
            if ((idx+1)%3===0) {content.push(<div className="w-100"></div>)}
        })

        if(this.props.isLoading || array===undefined)
        {
            return <div></div>;
        }
        else{
            return(     
                <div className='row' align='center'>
                    {content}
                </div>
            )}
    }
}
const mapStateToProps=(state: Object)=>{
    return{
      isLoading: state.isLoading,
      articles: state.articles,
    };
  }
    
  export default connect(mapStateToProps)(Display);
