export const CHANGE_COUNTRY = 'CHANGE_COUNTRY'
export const CUR_PAGE = 'CUR_PAGE'
export const SET_ARTICLES = 'SET_ARTICLES'
export const LOADING = 'LOADING'
export const SET_NEWS_END='SET_NEWS_END'
export const SET_ERROR_EXIST='SET_ERROR_EXIST'
export const SET_LOGIN='SET_LOGIN'



export function setcountry(newCode) {
  return { type: CHANGE_COUNTRY, val: newCode }
}

export function setpage(page) {
  return { type: CUR_PAGE, val: page }
}

export function setarticles(articles) {
  return { type: SET_ARTICLES, val: articles }
}

export function setloading(status) {
    //console.log("In Loading "+status);
    return { type: LOADING, val: status }
}

export function setnewsend(status) {
  return { type: SET_NEWS_END, val: status }
}

export function seterrorexist(status) {
  return { type: SET_ERROR_EXIST, val: status }
}

export function setLoginStatus(status) {
  return { type: SET_LOGIN, val: status }
}

