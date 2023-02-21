const initialState = {
  articles: [],
  article: {},
  user: {},
  isAutorized: false,
  loading: true,
  slug: null,
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
    default:
      return state;
  }
};
