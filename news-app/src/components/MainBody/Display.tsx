import React from 'react';
import Post from '../Card/Post';
import {connect} from 'react-redux';
// import CardColumns from 'react-bootstrap/CardColumns';

class Display extends React.Component{
	public props: any;

    render(){
        const array: Array<Object> = this.props.articles;
        let content = [];
        array.forEach((post,idx) => {

            // push column
            content.push(
                <div className="col-sm py-3" key={idx}>
                            <Post key={idx} title={post.title} imageurl={post.urlToImage} description={post.description} url={post.url} content={post.content} cookies={this.props.cookies}/>

                </div>
            )
    
            // force wrap to next row every 4 columns
            if ((idx+1)%3===0) {content.push(<div className="w-100"></div>)}
        })



        if(this.props.is_loading || array===undefined)
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
      is_loading: state.is_loading,
      articles: state.articles,
    };
  }
    
  export default connect(mapStateToProps)(Display);
