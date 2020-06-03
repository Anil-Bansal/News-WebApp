import React from 'react'


const Person = (props) => {
    return (
        <div>
            <div>
                <img src={props.imageSrc} alt=''/>
                    <div>
                        <h2>{props.name}</h2>
                        <p>{props.title}</p>
                    </div>
            </div>
        </div>
    );
}

export default Person;