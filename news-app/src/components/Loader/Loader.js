import ClipLoader from 'react-spinners/ClipLoader';
import React from 'react';

const Loader=(props)=>{
    return (
        <div align='center'>
            <ClipLoader color={"#123abc"} size={50} loading={!props.news_end}/>
        </div>
    );
}

export default Loader;
