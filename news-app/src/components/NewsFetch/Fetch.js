import {getNews} from './news';
import {getNews2} from './news2';

export function fetchNews() {
    getNews(this.props.country,this.props.page)
    .then(articles=> {
      this.props.setarticles([...this.props.articles,...articles]);
      this.props.setloading(false);
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
};

export function fetchNewsSearch(search,page){
    getNews2(search,page)
    .then(articles=> {
      const new_articles=articles;
      this.props.setarticles(new_articles);
      this.props.setloading(false);
      this.props.setnewsend(true);
      this.props.setpage(this.props.page+1);
    })
    .catch(error=>{
      console.log(error);
      this.props.setloading(false);
      this.props.seterrorexist(true);
    })
  }