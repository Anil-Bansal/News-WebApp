import React from 'react'
import './head.css'
import ButtonCountry from "../Buttons/ButtonCountry"
import Button from 'react-bootstrap/Button'
import * as actiontypes from '../Redux/Actions';
import {connect} from 'react-redux';
import {fetchNews,fetchNewsSearch} from '../NewsFetch/Fetch';
import SignOutButton from '../Auth/Signout';

class Head extends React.Component{
	public fetchNews: void;
	public fetchNewsSearch: void;
	public props: any;
	public input: any;

    constructor(props: any){
      super(props);
      this.onChange=this.onChange.bind(this);
      this.fetchNews=fetchNews.bind(this);
      this.fetchNewsSearch=fetchNewsSearch.bind(this);

      this.searchNews=this.searchNews.bind(this);
    }

    async searchNews (search: string)
      {
        await this.props.setLoading(true);
        await this.props.setCountry("");
        await this.props.setArticles([]);
        await this.props.setPage(1);
        await this.props.setNewsEnd(false);
        await this.props.setErrorExist(false);
        this.fetchNewsSearch(search,this.props.page);
      }

    handleSubmit = event => {
        event.preventDefault();
        this.searchNews(this.input.value);
        event.target.reset();
      };
    
      async onChange(code: string)
      {
        await this.props.setLoading(true);
        await this.props.setCountry(code);
        await this.props.setArticles([]);
        await this.props.setPage(1);
        await this.props.setNewsEnd(false);
        await this.props.setErrorExist(false);
        this.fetchNews();
      }

    render(){
        return (
            <div>
                <div className='Head'>
                  <div className='row'>
                    <div className='column'>
                        <h1 align="center"> Simple News App</h1>
                    </div>
                    
                  </div>
                    <div className='Search' align = "center">
                        <form id="Search-form" onSubmit={this.handleSubmit}>
                        <label htmlFor="search"><h6>Search for News : </h6> </label>
                        <input
                            type="text"
                            name="search"
                            ref={(input) => this.input = input}
                        />
                        <Button variant='outline-light'
                            type='submit'>
                            Submit 
                        </Button>
                        <SignOutButton />
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

const mapStateToProps=(state: any)=>{
    return{
      isLoading: state.isLoading,
      country: state.country ,
      errorExist: state.errorExist,
      articles: state.articles,
      page: state.page
    };
  }
  
  const mapDispatchToProps=dispatch=>{
    return{
      setLoading: (val)=>dispatch(actiontypes.setLoading(val)),
      setNewsEnd: (val)=>dispatch(actiontypes.setNewsEnd(val)),
      setArticles: (val)=>dispatch(actiontypes.setArticles(val)),
      setErrorExist: (val)=>dispatch(actiontypes.setErrorExist(val)),
      setCountry: (val)=>dispatch(actiontypes.setCountry(val)),
      setPage: (val)=>dispatch(actiontypes.setPage(val))
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Head);