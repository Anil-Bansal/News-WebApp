import React from 'react';
import Person from './Person.js';
import Vinayak from '../../assets/Vinayak.jpeg';
import Anil from '../../assets/Anil.jpg';
import './Team.css'
const Info = (props) => {
    return (
        <div>
            <div className="container">
                <h1 style={{marginTop: 10}}>Alone We Can Do So Little, Together We Can Do So Much.</h1>
                <div  className='row'  >
                    
                    <Person  name='Anil Bansal' imageSrc = {Anil} title='SDE Intern'/>
                    <Person name='Vinayak Aggarwal' imageSrc = {Vinayak} title='SDE Intern'/>
                </div>
            </div>

        </div>
    );
}

export default Info;