import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import ArticlesPage from '../pages/ArticlesPage';
import ArticlePage from '../pages/ArticlePage';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';
import EditProfilePage from '../pages/EditProfilePage';
import NewArticlePage from '../pages/NewArticlePage';
import EditArticlePage from '../pages/EditArticlePage';
import * as actions from '../../store/actions';

import classes from './App.module.scss';

function App({ loading, getAllArticles, isAutorized, user, autentification }) {
  let navigate = useNavigate();
  React.useEffect(() => {
    if (isAutorized && Object.keys(user).length === 0) {
      console.log(user, isAutorized);
      autentification(JSON.parse(localStorage.getItem('token')));
    }
    getAllArticles();
  }, []);
  const PrivateRoute = ({ children }) => {
    if (isAutorized) {
      return children;
    }

    return navigate('/sign-in');
  };
  return (
    <div className={classes.app}>
      <Header />
      {loading ? (
        <Spin tip="Loading" size="small">
          <div className="content" />
        </Spin>
      ) : (
        <Routes>
          <Route exact path="/" element={<ArticlesPage />} />
          <Route exact path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/articles/:slug/edit" element={<EditArticlePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/profile" element={<EditProfilePage />} />
          <Route
            path="/new-article"
            element={
              <PrivateRoute>
                <NewArticlePage />
              </PrivateRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    isAutorized: state.isAutorized,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { getAllArticles, autentification } = bindActionCreators(actions, dispatch);
  return {
    getAllArticles,
    autentification,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
