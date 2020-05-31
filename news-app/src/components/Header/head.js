import React from 'react'
import './head.css'
import ButtonCountry from "../Buttons/ButtonCountry"
// import MaterialUIForm from 'react-material-ui-form'
import Button from 'react-bootstrap/Button'




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
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="Australia" code="au"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="Argentina" code="ar"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="Belgium" code="be"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="Canada" code="ca"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="China" code="cn"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="Egypt" code="eg"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="France" code="fr"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="Germany" code="de"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="Italy" code="it"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="India" code="in"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="Japan" code="jp"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="Malaysia" code="my"/> 
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="Mexico" code="mx"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="Russia" code="ru"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="Sweden" code="se"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="Switzerland" code="ch"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="UK" code="gb"/>
                <ButtonCountry currentCode={this.props.currentCode} onChange={this.props.onChange} country="USA" code="us"/>
                </div>
                
            </div>
        )
    }
}

export default Head