import React from 'react';
import { withFirebase } from './components/Firebase';


class Profile extends React.Component{
    constructor(props: any){
        super(props);
        this.state={
            likedUrl: []
        };
    }

    async componentDidMount(){
        var uid=await this.props.firebase.getUID();
        var array=await this.props.firebase.getCookieFromDatabase(uid);
        await this.setState({likedUrl: array});
    }

    goToUrl(url: string){
        window.open(url,'_blank');
    }

    render(){
        console.log(this.state.likedUrl.length);
        let content: any = [];
        const array: Array<string> =this.state.likedUrl;
        [...array].forEach((url: string,idx: number) => {
            content.push(
                <div key={idx}>
                    <h5 onClick={()=>this.goToUrl(url)}>{url}</h5>
                    <br></br>
                </div>
            )
        })

        return(
            <div className='row' align='center'>
                    {content}
            </div>
        )
    }

}

export default withFirebase(Profile);