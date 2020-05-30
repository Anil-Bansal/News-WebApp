export async function getNews(country,page_num){
    console.log(country,page_num)
    const url=`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=ad23c45e8dbf4c418fc72871384d9ec5&page=${page_num}`;
    let result=await fetch(url).then(response=> response.json());
    return result.articles;
}