import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import SourceCard from './SourceCard';
import {NewsPost} from '../Card/Post'

interface SourcesProps{
    array: Array<NewsPost>
    loading: boolean
}

const DisplaySources:React.FC<SourcesProps> =(props: SourcesProps )=>{
    const array: Array<NewsPost> =props.array;
    if(props.loading)
        return <div></div>;
    else{
        return(     
        <div align='center'>
            <CardColumns align="center" > 
                {array.map((source: NewsPost,idx: number) => (
                    <SourceCard key={idx}  name={source.name} description={source.description} url={source.url} />
                ))}
            </CardColumns>
            </div>
        )
    }
}

export default DisplaySources;