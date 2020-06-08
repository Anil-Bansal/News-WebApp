export const CHANGE_COUNTRY = 'CHANGE_COUNTRY'
export const CUR_PAGE = 'CUR_PAGE'
export const SET_ARTICLES = 'SET_ARTICLES'
export const LOADING = 'LOADING'
export const SET_NEWSEND='SET_NEWSEND'
export const SET_ERROREXIST='SET_ERROREXIST'
export const SET_LOGIN='SET_LOGIN'
export const SET_UID='SET_UID'
export const SET_LIKED_URL='SET_LIKED_URL'
export const SET_COOKIE_LOAD='SET_COOKIE_LOAD'


export function setCountry(newCode:String) {
  return { type: CHANGE_COUNTRY, val: newCode }
}

export function setPage(page: Number) {
  return { type: CUR_PAGE, val: page }
}

export function setArticles(articles: Array<Object>) {
  return { type: SET_ARTICLES, val: articles }
}

export function setLoading(status: Boolean) {
    return { type: LOADING, val: status }
}

export function setNewsEnd(status: Boolean) {
  return { type: SET_NEWSEND, val: status }
}

export function setErrorExist(status: Boolean) {
  return { type: SET_ERROREXIST, val: status }
}

export function setLoginStatus(status: Boolean) {
  return { type: SET_LOGIN, val: status }
}

export function setUserId(uid: String) {
  return { type: SET_UID, val: uid }
}

export function setCookieLoad(status: Boolean) {
  return { type: SET_COOKIE_LOAD, val: status }
}