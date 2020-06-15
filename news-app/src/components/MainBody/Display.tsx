import React from 'react';
import Post from '../Card/Post';
import {connect} from 'react-redux';
import {StateTypes} from '../Redux/Reducers'
import {NewsPost} from '../Card/Post'
import CardColumns from 'react-bootstrap/CardColumns';

interface DisplayProps extends StateTypes{
    show: string;
    cookies: Object;
}

class Display extends React.Component<DisplayProps>{

    reorderPosts(newsPosts){
        let content:Array<Object> = [];
        newsPosts.forEach((post: NewsPost,idx: number) => {
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
            if ((idx+1)%3===0) {
                content.push(<div key={newsPosts.length+idx} className="w-100"></div>)
            }
        })
        return content;
    }    

    columnOrder(newsPosts){
        let content:Array<Object> = [];
        newsPosts.forEach((post: NewsPost,idx: number) => {
            content.push(
                    <Post key={idx} 
                        title={post.title} 
                        imageurl={post.urlToImage} 
                        description={post.description} 
                        url={post.url} 
                        content={post.content} 
                        cookies={this.props.cookies}
                        show={this.props.show}/>
            )
        })
        return (
            <CardColumns className='favDisplay'>
                {content}
            </CardColumns>
        )
    }
    
    render(){
        const array: Array<NewsPost> = this.props.show==='likedOnly' ? 
                                    this.columnOrder(this.props.liked): 
                                    this.reorderPosts(this.props.articles);
        if(this.props.isLoading || array===undefined)
            return <div/>;
        else{
            return(
                <div className='row' style={{marginTop:'1em', justifyContent: 'center'}} align='center'>
                    {array}
                </div>
            )
        }
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
