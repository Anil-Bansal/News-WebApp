import React from 'react';
import Person from './Person';
import Vinayak from '../../assets/Vinayak.jpeg';
import Anil from '../../assets/Anil.jpg';
import './Team.css'
import { withFirebase } from '../Firebase';

interface TeamProps{
    firebase: {
        addEvent : Function
    }
}

const Info:React.FC<TeamProps> =(props: TeamProps ) => {
    props.firebase.addEvent('viewDevelopers',{});
    return (
        <div data-align='center'>
            <div className="containerInfo">
                <h1 style={{marginTop: 10}}>Alone We Can Do So Little, Together We Can Do So Much.</h1>
                <div  className='row'  >        
                    <Person  name='Anil Bansal' imageSrc = {Anil} title='SDE Intern'/>
                    <Person name='Vinayak Aggarwal' imageSrc = {Vinayak} title='SDE Intern'/>
                </div>
            </div>
        </div>
    );
}

export default withFirebase(Info);