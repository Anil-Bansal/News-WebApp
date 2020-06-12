import React from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import { StateTypes } from '../Redux/Reducers';

interface Props{
  code: string,
  onChange: Function,
  country: string,
  currentCountry: string
}
class ButtonCountry extends React.Component<Props>{
    render(){
        return (
            <Button variant= {(this.props.currentCountry === this.props.code) ? "dark" : "light"} 
              onClick={()=>this.props.onChange(this.props.code)}>
                {this.props.country}
            </ Button>
        )
    }
}

const mapStateToProps= (state: StateTypes) =>{
    return{
      currentCountry: state.country ,
    };
}
  
export default connect(mapStateToProps,)(ButtonCountry);
  