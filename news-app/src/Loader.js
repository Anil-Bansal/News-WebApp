import React from 'react';
import { BallBeat } from 'react-pure-loaders';
const BottomLoader = (props) => {
    return (
        <div>
          <BallBeat color={'#123abc'} loading={props.load}/>
        </div>
    );
}

export default BottomLoader;