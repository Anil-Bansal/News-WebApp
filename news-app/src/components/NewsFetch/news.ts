export async function getNews(country: string,page_num: number){
    const url=`https://amazekart.tech/news/?country=${country}&page=${page_num}`
    let result=await fetch(url).then(response=> response.json());
    return result.articles;
}

export async function getNewsSearch(search: string){
    const url=`https://amazekart.tech/news/?search=${search}`
    let result=await fetch(url).then(response=> response.json());
    return result.articles;
}