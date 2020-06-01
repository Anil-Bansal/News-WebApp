export const CHANGE_COUNTRY = 'CHANGE_COUNTRY'
export const ADD_NEW_PAGE = 'ADD_NEW_PAGE'
export const RESET_ARTICLES = 'RESET_ARTICLES'
export const LOADING = 'LOADING'

export function changeCountry(newCode) {
  return { type: CHANGE_COUNTRY, newCode }
}

export function addNewPage(articles) {
  return { type: ADD_NEW_PAGE, articles }
}

export function resetArticles(articles) {
  return { type: RESET_ARTICLES, articles }
}

export function loading(status) {
    return { type: LOADING, status }
}
  

