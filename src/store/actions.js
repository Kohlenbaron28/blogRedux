import service from './Service';

export const getAllArticles = (payload) => {
  return { type: 'GET_ARTICLES', payload };
};
export const getArticle = (slug) => {
  return function (dispatch) {
    service
      .getArticleBySlug(slug)
      .then((res) => res.article)
      .then((article) => {
        dispatch({
          type: 'GET_ARTICLE_BY_SLUG',
          article: article,
        });
      });
  };
};
// export const sendSlug = (payload) => {
//   return { type: 'SEND_SLUG', payload };
// };
export const showMore = () => {
  return { type: 'SHOW_MORE' };
};
