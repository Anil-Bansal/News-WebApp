import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import SourceCard from './SourceCard';

const DisplaySources=(props)=>{
    const array=props.array;
    if(props.loading)
        return <div></div>;
    else{
        return(     
            <CardColumns align="center"> 
                {array.map((source,idx) => (
                    <SourceCard key={idx}  name={source.name} description={source.description} url={source.url} />
                ))}
            </CardColumns>
        )
    }
}

export default DisplaySources;