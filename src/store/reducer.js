const initialState = {
  articles: [],
  article: {},
  user: {},
  isAutorized: JSON.parse(localStorage.getItem('isAutorized')),
  loading: true,
  slug: null,
  image: '',
  alertValue: 'none',
  favorite: {},
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ARTICLES':
      return {
        ...state,
        articles: [...state.articles, ...action.articles],
        loading: false,
      };
    case 'GET_ARTICLE_BY_SLUG':
      console.log(action);
      return {
        ...state,
        article: action,
        slug: action.article.slug,
      };
    case 'SEND_SLUG':
      return {
        ...state,
        slug: action.payload,
      };
    case 'SHOW_MORE':
      return {
        ...state,
        articles: action.articles,
      };
    case 'REGISTRATION':
      return {
        ...state,
        user: action.res,
        isAutorized: true,
      };
    case 'AUTENTIFICATION':
      return {
        ...state,
        user: action.res,
        isAutorized: true,
      };
    case 'LOG_OUT':
      return {
        ...state,
        isAutorized: false,
      };
    case 'EDIT_PROFILE':
      return {
        ...state,
        user: action.res,
        isAutorized: true,
        image: action.res.img,
      };
    case 'POST_ARTICLE':
      return {
        ...state,
        articles: [...state.articles, action.res.article],
      };
    case 'EDIT_ARTICLE':
      return {
        ...state,
        article: action.res,
        articles: [...state.articles, action.res.article],
      };
    case 'DELETE_ARTICLE':
      return {
        ...state,
        article: action.res,
      };
    case 'CHANGE_ALERT_VALUE': {
      let val = '';
      if (state.alertValue === 'none') {
        val = 'block';
      } else {
        val = 'none';
      }
      return {
        ...state,
        alertValue: val,
      };
    }
    case 'FAVORITE_ARTICLE':
      return {
        ...state,
        favorite: action.res.article,
      };
    default:
      return state;
  }
};
