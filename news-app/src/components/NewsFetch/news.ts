export async function getNews(country: string,page_num: number){
    const url=`http://3.134.79.126:8002/news/?country=${country}&page=${page_num}`
    let result=await fetch(url).then(response=> response.json());
    return result.articles;
}

export async function getNewsSearch(search: string){
    const url=`http://3.134.79.126:8002/news/?search=${search}`
    let result=await fetch(url).then(response=> response.json());
    return result.articles;
}