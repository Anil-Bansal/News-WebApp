import React from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';

class ButtonCountry extends React.Component{
	public props: any;

    render(){
        return (
            
            <Button variant= {(this.props.currentCountry === this.props.code) ? "dark" : "light"} onClick={()=>this.props.onChange(this.props.code)}>
                {/* {console.log(props.currentCode, props.code)} */}
                {this.props.country}
            </ Button>
        )
        }
}

const mapStateToProps=state=>{
    return{
      currentCountry: state.country ,
    };
  }
  
export default connect(mapStateToProps,)(ButtonCountry);
  