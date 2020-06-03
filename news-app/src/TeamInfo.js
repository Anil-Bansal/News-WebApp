import React from 'react';
import Person from './Person.js';
import Vinayak from './Vinayak.jpeg';
import Anil from './Anil.jpg';

const Info = (props) => {
    return (
        <div>
            <div className="container">
                <h1>Alone We Can Do So Little, Together We Can Do So Much.</h1>
                <div className="row">
                    <Person name='Anil Bansal' imageSrc = {Anil} title='SDE Intern'/>
                    <Person name='Vinayak Agarwal' imageSrc = {Vinayak} title='SDE Intern'/>
                </div>
            </div>

        </div>
    );
}

export default Info;