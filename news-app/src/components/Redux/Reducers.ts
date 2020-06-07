import {CHANGE_COUNTRY,SET_ARTICLES,CUR_PAGE,LOADING,SET_ERROR_EXIST,SET_NEWS_END,SET_LOGIN,SET_UID,SET_COOKIE_LOAD } from './Actions.ts'

const initialState ={
    is_loading: true,
    page: 1,
    country: 'in',
    articles:[],
    news_end: false,
    error_exist: false, 
    isLoggedIn: true,
    uid: "",
    cookieLoaded: true
}

function newsApp(state = initialState, action?) {

    switch (action.type) {
        case LOADING:
            return Object.assign({}, state,{
                is_loading: action.val,
            })
        case CHANGE_COUNTRY:
            return Object.assign({}, state,{
                country: action.val,
            })
        case SET_NEWS_END:
            return Object.assign({}, state,{
                news_end: action.val
            })
        case SET_ARTICLES:
            return Object.assign({}, state,{
                articles: action.val,
            })
        case CUR_PAGE:
            return Object.assign({}, state,{
                page: action.val,
            })
        case SET_ERROR_EXIST:
            return Object.assign({}, state,{
                error_exist: action.val,
            })
        case SET_LOGIN:
            return Object.assign({}, state,{
                isLoggedIn: action.val,
            })
        case SET_UID:
            return Object.assign({}, state,{
                uid: action.val,
            })
        case SET_COOKIE_LOAD:
            return Object.assign({}, state,{
                cookieLoaded: action.val,
            })
        default:
          return state
      }
  }

export default newsApp