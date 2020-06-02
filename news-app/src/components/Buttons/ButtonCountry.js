import React from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

function ButtonCountry(props){
    return (
        
        <Button variant= {(props.currentCode === props.code) ? "dark" : "light"} onClick={()=>props.onChange(props.code)}>
            {/* {console.log(props.currentCode, props.code)} */}
            {props.country}
        </ Button>
    )
}

export default ButtonCountry;