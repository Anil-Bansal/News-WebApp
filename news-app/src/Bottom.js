import React from 'react';
import { BallBeat } from 'react-pure-loaders';
const BottomLoader = (props) => {
    return (
        <div>
          <BallBeat
            color={'#000000'}
            loading={props.load}
          />
        </div>
    );
}

export default BottomLoader;