export async function getNews2(search,page_num){
    const url=`https://newsapi.org/v2/everything?q=${search}&apiKey=ed670e2fd04f475fa4b296d2085be2e3`;
    console.log('fetchsearch')
    let result=await fetch(url).then(response=> response.json());
    return result.articles;
}