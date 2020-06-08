import React from 'react'

const Person = (props: any) => {
    return (
        <div>
            <div style ={{marginLeft:150, marginTop:50}}>
                <img src={props.imageSrc} alt='' height={300}/>
                    <div align='center'>
                        <h2>{props.name}</h2>
                        <p>{props.title}</p>
                    </div>
            </div>
        </div>
    );
}

export default Person;