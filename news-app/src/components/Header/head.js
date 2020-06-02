import React from 'react'
import './head.css'
import ButtonCountry from "../Buttons/ButtonCountry"
// import MaterialUIForm from 'react-material-ui-form'
import Button from 'react-bootstrap/Button'
// import {getNews} from '../NewsFetch/news'
import * as actiontypes from '../Redux/Actions';
import {connect} from 'react-redux';

class Head extends React.Component{
    handleSubmit = event => {
        event.preventDefault();
        this.props.search(this.input.value);
        event.target.reset();
      };
    
    render(){
        return (
            <div>
                <div className='Head'>
                    <div className='column'>
                        <h1 align="center"> Simple News App</h1>
                    </div>
                    <div className='Search' align = "center">
                        <form id="Search-form" onSubmit={this.handleSubmit}>
                        <label htmlFor="search">Search for News :  </label>
                        <input
                            type="text"
                            name="search"
                            ref={(input) => this.input = input}
                        />
                        <Button variant='outline-light'
                            type='submit'
                        >
                            Submit 
                        </Button>
                        </form>
                    </div>
                </div>
                <div className='Select'>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="Australia" code="au"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="Argentina" code="ar"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="Belgium" code="be"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="Canada" code="ca"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="China" code="cn"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="Egypt" code="eg"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="France" code="fr"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="Germany" code="de"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="Italy" code="it"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="India" code="in"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="Japan" code="jp"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="Malaysia" code="my"/> 
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="Mexico" code="mx"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="Russia" code="ru"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="Sweden" code="se"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="Switzerland" code="ch"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="UK" code="gb"/>
                <ButtonCountry currentCode={this.props.country} onChange={this.onChange} country="USA" code="us"/>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
      country: state.country ,
      error_exist: state.error_exist,
    };
  }
  
  const mapDispatchToProps=dispatch=>{
    return{
      setloading: (val)=>dispatch(actiontypes.setloading(val)),
      setnewsend: (val)=>dispatch(actiontypes.setnewsend(val)),
      setarticles: (val)=>dispatch(actiontypes.setarticles(val)),
      seterrorexist: (val)=>dispatch(actiontypes.seterrorexist(val)),
      setcountry: (val)=>dispatch(actiontypes.setcountry(val)),
      setpage: (val)=>dispatch(actiontypes.setpage(val))
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Head);