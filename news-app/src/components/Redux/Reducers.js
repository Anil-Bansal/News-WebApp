import {CHANGE_COUNTRY,ADD_NEW_PAGE,RESET_ARTICLES,LOADING } from './Actions.js'
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
        case ADD_NEW_PAGE:
            return Object.assign({}, state,{
                page: state.page+1,
                articles: [
                    ...state.articles,
                    action.articles
                ],
                news_end: action.articles.length < 10 ? true:false
            })
        case RESET_ARTICLES:
            return Object.assign({}, state,{
                country: '',
                articles: [
                    action.articles
                ],
                news_end: true
            })
        default:
          return state
      }
  }

export default newsApp