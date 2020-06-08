import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import SourceCard from './SourceCard';

const DisplaySources=(props: any )=>{
    const array: Array<Object> =props.array;
    if(props.loading)
        return <div></div>;
    else{
        return(     
            <CardColumns align="center"> 
                {array.map((source: Object,idx: Number) => (
                    <SourceCard key={idx}  name={source.name} description={source.description} url={source.url} />
                ))}
            </CardColumns>
        )
    }
}

export default DisplaySources;