import React from 'react'
import './head.css'
import ButtonCountry from "./ButtonCountry"

function Head(){
    return (
        <div>
            <div className='Head'>
                <h1 > Simple News App</h1>
            </div>
            <div className='Select'>
              <ButtonCountry country="World"/>
              <ButtonCountry country="Australia" code="AU"/>
              <ButtonCountry country="Belgium" code="BE"/>
              <ButtonCountry country="China" code="CN"/>
              <ButtonCountry country="Egypt" code="EG"/>
              <ButtonCountry country="France" code=" FR"/>
              <ButtonCountry country="Germany" code="DE"/>
              <ButtonCountry country="India" code="IN"/>
              <ButtonCountry country="Japan" code="JP"/>
              <ButtonCountry country="Malaysia" code="MY"/> 
              <ButtonCountry country="Mexico" code="MX"/>
              <ButtonCountry country="Monaco" code="MC"/>
              <ButtonCountry country="Pakistan" code="PK"/>
              <ButtonCountry country="Russia" code="RU"/>
              <ButtonCountry country="Sweden" code="SE"/>
              <ButtonCountry country="Switzerland" code="CH"/>
              <ButtonCountry country="UK" code="GB"/>
              <ButtonCountry country="USA" code="US"/>

            </div>
        </div>
    )
}

export default Head