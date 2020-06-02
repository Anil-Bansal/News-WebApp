import React from 'react'
import './head.css'
import ButtonCountry from "../Buttons/ButtonCountry"
// import MaterialUIForm from 'react-material-ui-form'
import Button from 'react-bootstrap/Button'
// eslint-disable-next-line
import {getNews} from '../NewsFetch/news'
import * as actiontypes from '../Redux/Actions';
import {connect} from 'react-redux';

class Head extends React.Component{
    handleSubmit = event => {
        event.preventDefault();
        this.props.search(this.input.value);
        event.target.reset();
      };
    
      async onChange(code)
      {
        console.log('head-async')
        await this.props.setloading(true);
        await this.props.setcountry(code);
        await this.props.setarticles([]);
        await this.props.setpage(1);
        await this.props.setnewsend(false);
        await this.props.seterrorexist(false);
        this.fetchnews();
      }
      fetchnews() {
        getNews(this.props.country,this.props.page)
        .then(articles=> {
          const new_articles=[...this.props.articles,...articles];
          this.props.setarticles(new_articles);
          console.log(this.props.articles.length);
          this.props.setloading(false);
          console.log(this.props.is_loading);
          if(articles.length<10){
            this.props.setnewsend(true);
          }
        })
        .catch(error=>{
          console.log(error);
          this.props.setloading(false);
          this.props.seterrorexist(true);
        })
    
        this.props.setpage(this.props.page+1);
      }

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
                <ButtonCountry  onChange={this.onChange} country="Australia" code="au"/>
                <ButtonCountry  onChange={this.onChange} country="Argentina" code="ar"/>
                <ButtonCountry  onChange={this.onChange} country="Belgium" code="be"/>
                <ButtonCountry  onChange={this.onChange} country="Canada" code="ca"/>
                <ButtonCountry  onChange={this.onChange} country="China" code="cn"/>
                <ButtonCountry  onChange={this.onChange} country="Egypt" code="eg"/>
                <ButtonCountry  onChange={this.onChange} country="France" code="fr"/>
                <ButtonCountry  onChange={this.onChange} country="Germany" code="de"/>
                <ButtonCountry  onChange={this.onChange} country="Italy" code="it"/>
                <ButtonCountry  onChange={this.onChange} country="India" code="in"/>
                <ButtonCountry  onChange={this.onChange} country="Japan" code="jp"/>
                <ButtonCountry  onChange={this.onChange} country="Malaysia" code="my"/> 
                <ButtonCountry  onChange={this.onChange} country="Mexico" code="mx"/>
                <ButtonCountry  onChange={this.onChange} country="Russia" code="ru"/>
                <ButtonCountry  onChange={this.onChange} country="Sweden" code="se"/>
                <ButtonCountry  onChange={this.onChange} country="Switzerland" code="ch"/>
                <ButtonCountry  onChange={this.onChange} country="UK" code="gb"/>
                <ButtonCountry  onChange={this.onChange} country="USA" code="us"/>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
      country: state.country ,
      error_exist: state.error_exist,
      articles: state.articles,
      page: state.page
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