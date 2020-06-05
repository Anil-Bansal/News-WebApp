import {CHANGE_COUNTRY,SET_ARTICLES,CUR_PAGE,LOADING,SET_ERROR_EXIST,SET_NEWS_END } from './Actions.js'
// import { combineReducers } from 'redux'
// eslint-disable-next-line
import React from 'react';

const initialState ={
    is_loading: true,
    page: 1,
    country: 'in',
    articles:[],
    news_end: false,
    error_exist: false, 
}

function newsApp(state = initialState, action?) {
    //if(action.type===LOADING)
    //    console.log(action.val);
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
        default:
          return state
      }
  }

export default newsApp