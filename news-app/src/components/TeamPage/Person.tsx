import React from 'react'

interface PersonProps{
    name: string;
    title: string;
    imageSrc: string;
}

const Person:React.FC<PersonProps> = (props: PersonProps) => {
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