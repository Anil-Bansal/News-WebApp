export async function getNews(country: String,page_num: Number){
    const url=`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=ed670e2fd04f475fa4b296d2085be2e3&page=${page_num}&pageSize=10`;
    let result=await fetch(url).then(response=> response.json());
    return result.articles;
}