import {CHANGE_COUNTRY,SET_ARTICLES,CUR_PAGE,LOADING,SET_ERROREXIST,SET_NEWSEND,SET_LOGIN,SET_UID,SET_COOKIE_LOAD,SET_LIKED } from './Actions.ts'

const initialState ={
    isLoading: false,
    page: 1,
    country: 'in',
    articles:[],
    liked:[],
    newsEnd: false,
    errorExist: false, 
    isLoggedIn: false,
    uid: "",
    cookieLoaded: false
}

function newsApp(state: Object = initialState, action: Object) {
    switch (action.type) {
        case LOADING:
            return Object.assign({}, state,{
                isLoading: action.val,
            })
        case CHANGE_COUNTRY:
            return Object.assign({}, state,{
                country: action.val,
            })
        case SET_NEWSEND:
            return Object.assign({}, state,{
                newsEnd: action.val
            })
        case SET_ARTICLES:
            return Object.assign({}, state,{
                articles: action.val,
            })
        case SET_LIKED:
            return Object.assign({}, state,{
                liked: action.val,
            })
        case CUR_PAGE:
            return Object.assign({}, state,{
                page: action.val,
            })
        case SET_ERROREXIST:
            return Object.assign({}, state,{
                errorExist: action.val,
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