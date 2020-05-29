export async function getNews2(search){
    // console.log(country)
    const url=`https://newsapi.org/v2/everything?q=${search}&apiKey=ad23c45e8dbf4c418fc72871384d9ec5`;
    console.log('fetchsearch')
    let result=await fetch(url).then(response=> response.json());
    return result.articles;
}