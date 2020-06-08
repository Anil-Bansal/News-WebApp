import {getNews,getNewsSearch} from './news';

export function fetchNews() {
    getNews(this.props.country,this.props.page)
    .then((articles: Array<Object>)=> {
      this.props.setArticles([...this.props.articles,...articles]);
      this.props.setLoading(false);
      if(articles.length<10){
        this.props.setNewsEnd(true);
      }
    })
    .catch(error=>{
      console.log(error);
      this.props.setLoading(false);
      this.props.setErrorExist(true);
    })
    this.props.setPage(this.props.page+1);
};

export function fetchNewsSearch(search: String){
    getNewsSearch(search)
    .then((articles: Array<Object>)=> {
      this.props.setArticles(articles);
      this.props.setLoading(false);
      this.props.setNewsEnd(true);
      this.props.setPage(this.props.page+1);
    })
    .catch(error=>{
      console.log(error);
      this.props.setLoading(false);
      this.props.setErrorExist(true);
    })
}