import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin } from 'antd';
import { Routes, Route } from 'react-router-dom';

import Header from '../Header/Header';
import ArticlesPage from '../pages/ArticlesPage';
import ArticlePage from '../pages/ArticlePage';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';
import EditProfilePage from '../pages/EditProfilePage';
import * as actions from '../../store/actions';

import classes from './App.module.scss';

function App({ loading, getAllArticles }) {
  React.useEffect(() => {
    getAllArticles();
  }, []);
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
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/profile" element={<EditProfilePage />} />
        </Routes>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { getAllArticles } = bindActionCreators(actions, dispatch);
  return {
    getAllArticles,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
