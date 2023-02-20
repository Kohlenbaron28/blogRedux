const initialState = {
  articles: [],
  article: {},
  loading: true,
  slug: null,
  sliceEl: 0,
  endSlice: 20,
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
    default:
      return state;
  }
};
