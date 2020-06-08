import React from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';

class ButtonCountry extends React.Component{
    render(){
        return (
            
            <Button variant= {(this.props.currentCountry === this.props.code) ? "dark" : "light"} 
              onClick={()=>this.props.onChange(this.props.code)}>
                {this.props.country}
            </ Button>
        )
    }
}

const mapStateToProps= (state:any) =>{
    return{
      currentCountry: state.country ,
    };
  }
  
export default connect(mapStateToProps,)(ButtonCountry);
  