import { Pagination } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../store/actions';
import Article from '../Article/Article';

import classes from './ArticleList.module.scss';

let keys = 100;

const ArticleList = ({ articles, showMore }) => {
  let elements = articles.map((article) => {
    return (
      <Article
        key={keys++}
        slug={article.slug}
        title={article.title}
        description={article.description}
        body={article.body}
        tagList={article.tagList}
        favoritesCount={article.favoritesCount}
        name={article.author.username}
        img={article.author.image}
        createdAt={article.createdAt}
      />
    );
  });
  return (
    <div className={classes.articleList}>
      {elements}
      <Pagination
        defaultCurrent={1}
        total={50}
        style={{ textAlign: 'center' }}
        onChange={() => {
          showMore();
          console.log(articles);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { getAllArticles, showMore } = bindActionCreators(actions, dispatch);
  return {
    getAllArticles,
    showMore,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
