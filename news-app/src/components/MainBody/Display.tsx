import React from 'react';
import Post from '../Card/Post';
import {connect} from 'react-redux';
import {StateTypes} from '../Redux/Reducers'
import {NewsPost} from '../Card/Post'

interface DisplayProps extends StateTypes{
    show: string;
    cookies: Object;
}

class Display extends React.Component<DisplayProps>{
   
    render(){
        const array: Array<NewsPost> = this.props.show==='likedOnly' ? this.props.liked : this.props.articles;
        let content:Array<Object> = [];
        array.forEach((post: NewsPost,idx: number) => {
            content.push(
                <div className="col-sm py-3" key={idx}>
                    <Post key={idx} 
                        title={post.title} 
                        imageurl={post.urlToImage} 
                        description={post.description} 
                        url={post.url} 
                        content={post.content} 
                        cookies={this.props.cookies}
                        show={this.props.show}/>
                </div>
            )
            if ((idx+1)%3===0) {content.push(<div key={array.length+idx} className="w-100"></div>)}
        })
        console.log('array',content)

        if(this.props.isLoading || array===undefined)
            return <div></div>;
        else{
            return(     
                <div className='row' align='center'>
                    {content}
                </div>
            )}
    }
}
const mapStateToProps=(state: StateTypes)=>{
    return{
      isLoading: state.isLoading,
      articles: state.articles,
      liked: state.liked
    };
  }
    
  export default connect(mapStateToProps)(Display);
