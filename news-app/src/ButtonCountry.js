import React from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

function ButtonCountry(props){
    return (
        <Button variant="light">
            {props.country}
        </ Button>
    )
}

export default ButtonCountry