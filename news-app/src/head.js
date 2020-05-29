import React from 'react'
import './head.css'
import ButtonCountry from "./ButtonCountry"

function Head(props){
    return (
        <div>
            <div className='Head'>
                <h1 > Simple News App</h1>
            </div>
            <div className='Select'>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="World"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="Australia" code="au"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="Belgium" code="be"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="China" code="cn"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="Egypt" code="eg"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="France" code="fr"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="Germany" code="de"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="India" code="in"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="Japan" code="jp"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="Malaysia" code="my"/> 
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="Mexico" code="mx"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="Monaco" code="mc"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="Pakistan" code="pk"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="Russia" code="ru"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="Sweden" code="se"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="Switzerland" code="ch"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="UK" code="gb"/>
              <ButtonCountry currentCode={props.currentCode} onChange={props.onChange} country="USA" code="us"/>

            </div>
        </div>
    )
}

export default Head