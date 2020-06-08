import React from 'react';
import { withFirebase } from '../Firebase';
import Post from '../Card/Post';

class Profile extends React.Component{
    constructor(props: any) {
        super(props);
        this.state = {posts: []}
        this.getLiked=this.getLiked.bind(this)
      }

    async getLiked(cookies)
    {
      var array = await cookies.get('data')
      let content: Array = [];
      await array.forEach((post: Object,idx: number) => {
          console.log('.')
        content.push(
            <div className="col-sm py-3" key={idx}>
                <Post key={idx} 
                    title={post.title} 
                    imageurl={post.imageurl} 
                    description={post.description} 
                    url={post.url} 
                    content={null} 
                    cookies={this.props.cookies}/>
            </div>
        )
        if ((idx+1)%3===0) {content.push(<div key={array.length+idx} className="w-100"></div>)}
     })
     this.setState({posts :content})
     return content
    }

    render(){

        this.getLiked(this.props.cookies)
        // console.log('cc',content)
        // this.getLiked(this.props.cookies)
        return(     
            <div className='row' align='center'>
                {this.state.posts}
            </div>
        )
    }

}

export default withFirebase(Profile);