import {getNews,getNewsSearch} from './news';

//Fetch News and Set Values
export function fetchNews(this: any) {
    getNews(this.props.country,this.props.page)
    .then((articles: Array<Object>)=> {
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

//Fetch News acoording to Search Results
export function fetchNewsSearch(this: any,search: string){
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

//Fetch Liked Posts
export function fetchLiked(this:any){
    this.props.firebase.getDataFromDatabase(this.props.uid)
	.then((response:Object)=>
		this.props.setLiked(response))
    .catch((error: String)=>{
      	console.log(error);
    })
}