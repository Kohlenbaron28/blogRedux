const initialState = {
  articles: [],
  article: {},
  user: {},
  isAutorized: JSON.parse(localStorage.getItem('isAutorized')),
  loading: true,
  slug: null,
  image: '',
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
      return {
        ...state,
        article: action,
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
    default:
      return state;
  }
};
