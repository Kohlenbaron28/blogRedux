import service from './Service';

export const getAllArticles = () => {
  return function (dispatch) {
    service
      .getArticles()
      .then((res) => res.articles)
      .then((articles) =>
        dispatch({
          type: 'GET_ARTICLES',
          articles,
        })
      );
  };
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
let skip = 40;
export const showMore = () => {
  skip += 40;
  return function (dispatch) {
    service
      .getArticles(skip)
      .then((res) => res.articles)
      .then((articles) =>
        dispatch({
          type: 'SHOW_MORE',
          articles,
        })
      );
  };
};

export const registration = (data) => {
  return function (dispatch) {
    service.registrationUser(data).then((res) => {
      console.log(res);
      localStorage.setItem('email', JSON.stringify(res.user.email));
      localStorage.setItem('username', JSON.stringify(res.user.username));
      localStorage.setItem('isAutorized', JSON.stringify(true));
      localStorage.setItem('token', JSON.stringify(res.user.token));
      return dispatch({
        type: 'REGISTRATION',
        res,
      });
    });
  };
};

export const autentification = (token) => {
  return function (dispatch) {
    service.loginUser(token).then((res) => {
      console.log(res);
      localStorage.setItem('email', JSON.stringify(res.user.email));
      localStorage.setItem('username', JSON.stringify(res.user.username));
      localStorage.setItem('isAutorized', JSON.stringify(true));
      localStorage.setItem('token', JSON.stringify(res.user.token));
      return dispatch({
        type: 'AUTENTIFICATION',
        res,
      });
    });
  };
};
export const logOut = () => {
  localStorage.setItem('isAutorized', JSON.stringify(false));
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  return {
    type: 'LOG_OUT',
  };
};
