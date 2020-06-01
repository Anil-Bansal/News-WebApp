import {CHANGE_COUNTRY,SET_ARTICLES,CUR_PAGE,LOADING,SET_ERROR_EXIST,SET_NEWS_END } from './Actions.js'
// import { combineReducers } from 'redux'

const initialState ={
    is_loading: true,
    page: 1,
    country: 'in',
    articles:[],
    news_end: false,
    error_exist: false, 
}

function newsApp(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return Object.assign({}, state,{
                isLoading: action.status,
            })
        case CHANGE_COUNTRY:
            return Object.assign({}, state,{
                country: action.newCode,
            })
        case SET_NEWS_END:
            return Object.assign({}, state,{
                news_end: action.status
            })
        case SET_ARTICLES:
            return Object.assign({}, state,{
                articles: [
                    action.articles
                ],
            })
        case CUR_PAGE:
            return Object.assign({}, state,{
                page: action.page,
            })
        case SET_ERROR_EXIST:
            return Object.assign({}, state,{
                error_exist: action.status,
            })
        default:
          return state
      }
  }

export default newsApp