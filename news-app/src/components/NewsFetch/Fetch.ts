import {getNews,getNewsSearch} from './news';

export function fetchNews() {
    getNews(this.props.country,this.props.page)
    .then((articles: Array<Object>)=> {
      console.log(articles)
      this.props.setArticles([...this.props.articles,...articles]);
      this.props.setLoading(false);
      if(articles.length<10){
        this.props.setNewsEnd(true);
      }
    })
    .catch(error=>{
      console.log("ERROR",error);
      this.props.setLoading(false);
      this.props.setErrorExist(true);
    })
    this.props.setPage(this.props.page+1);
};

export function fetchNewsSearch(search: string){
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

 export function fetchLiked(){
        this.props.firebase.getDataFromDatabase(this.props.uid)
        .then((response:Object)=>this.props.setLiked(response))
        .catch(error=>{
          console.log(error);
        })
      }