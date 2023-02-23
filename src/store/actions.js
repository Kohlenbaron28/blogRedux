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
  return {
    type: 'LOG_OUT',
  };
};

export const editProfile = (token, data) => {
  console.log(token, data);
  localStorage.setItem('password', JSON.stringify(data.newPassword));
  return function (dispatch) {
    service.editProfilee(token, data).then((res) => {
      console.log(res);
      localStorage.setItem('email', JSON.stringify(res.user.email));
      localStorage.setItem('username', JSON.stringify(res.user.username));
      localStorage.setItem('password', JSON.stringify(res.user.password));
      localStorage.setItem('image', JSON.stringify(res.user.image));
      localStorage.setItem('isAutorized', JSON.stringify(true));
      localStorage.setItem('token', JSON.stringify(res.user.token));
      return dispatch({
        type: 'EDIT_PROFILE',
        res,
      });
    });
  };
};

export const postNewArticle = (token, data) => {
  console.log(token, data);
  return function (dispatch) {
    service.postNewArticle(token, data).then((res) => {
      console.log(res);
      return dispatch({
        type: 'POST_ARTICLE',
        res,
      });
    });
  };
};

export const editArticle = (token, data, slug) => {
  console.log(token, data, slug);
  return function (dispatch) {
    service.editArticle(token, data, slug).then((res) => {
      console.log(res);
      return dispatch({
        type: 'EDIT_ARTICLE',
        res,
      });
    });
  };
};

export const deleteArticle = (token, slug) => {
  console.log(token, slug);
  return function (dispatch) {
    service.deleteArticle(token, slug).then((res) => {
      console.log(res);
      return dispatch({
        type: 'DELETE_ARTICLE',
        res,
      });
    });
  };
};
export const changeAlertValue = () => {
  return {
    type: 'CHANGE_ALERT_VALUE',
  };
};
export const favoriteArticle = (token, slug) => {
  console.log(token, slug);
  return function (dispatch) {
    service.favoriteArticle(token, slug).then((res) => {
      console.log(res);
      return dispatch({
        type: 'FAVORITE_ARTICLE',
        res,
      });
    });
  };
};
