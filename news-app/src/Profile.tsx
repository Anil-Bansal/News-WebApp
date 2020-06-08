import React from 'react';
import { withFirebase } from './components/Firebase';
import Post from './components/Card/Post';


class Profile extends React.Component{
    render(){
        const array = (this.props.cookies).get('data');
        let content: any = [];
        array.forEach((post: Object,idx: number) => {
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

        return(
            <div className='row' align='center'>
                    {content}
            </div>
        )
    }

}

export default withFirebase(Profile);