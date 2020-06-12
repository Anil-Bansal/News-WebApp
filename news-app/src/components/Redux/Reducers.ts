import {CHANGE_COUNTRY,SET_ARTICLES,CUR_PAGE,LOADING,SET_ERROREXIST,SET_NEWSEND,
        SET_LOGIN,SET_UID,SET_COOKIE_LOAD,SET_LIKED,SET_LAST_LIKED, SET_MESSAGES,SET_TOAST,SET_NAME } from './Actions'
import {NewsPost} from '../Card/Post'
import {PostData} from '../Card/Post';

export interface StateTypes{
    isLoading?: Boolean
    page?: number
    country?: string
    articles: Array<NewsPost>
    liked: Array<NewsPost>
    newsEnd?: Boolean
    errorExist?: Boolean
    isLoggedIn?: Boolean
    uid?: string
    cookieLoaded?: Boolean
    name?:string
    messages?: Array<Object>
    lastLiked?: PostData
    showToast?: Boolean
}

export interface DispatchTypes{
    setCountry? : Function
    setPage? : Function
    setArticles? : Function
    setLiked? : Function
    setLoading? : Function
    setNewsEnd? : Function
    setLoginStatus? : Function
    setUserId? : Function
    setCookieLoad? : Function
    setErrorExist? : Function
}


const initialState: StateTypes ={
    isLoading: false,
    page: 1,
    country: 'in',
    articles:[],
    liked:[],
    newsEnd: false,
    errorExist: false, 
    isLoggedIn: false,
    uid: "",
    cookieLoaded: false,
    messages: [],
    lastLiked: null,
    showToast: false,
    name: ''
}

function newsApp(state: StateTypes = initialState, action: any) {
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
        case SET_TOAST:
            return Object.assign({}, state,{
                showToast: action.val,
            })
        case SET_UID:
            return Object.assign({}, state,{
                uid: action.val,
            })
        case SET_COOKIE_LOAD:
            return Object.assign({}, state,{
                cookieLoaded: action.val,
            })
        case SET_MESSAGES:
            return Object.assign({}, state,{
                messages: action.val,
            })
        case SET_LAST_LIKED:
            return Object.assign({}, state,{
                lastLiked: action.val,
            })
        case SET_NAME:
            return Object.assign({},state,{
                name: action.val
            })
        default:
          return state
      }
  }

export default newsApp