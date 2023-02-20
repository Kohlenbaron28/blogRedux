import { useLocation, matchPath } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { parseISO, format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

import * as actions from '../../store/actions';
import Heart from '../../img/heart.png';
import classes from '../Article/Article.module.scss';

let keys = 1;

const ArticlePage = ({ article, getArticle }) => {
  console.log('article', article);
  const { pathname } = useLocation();
  const slugParams = matchPath('/articles/*', pathname);
  const isSlug = Object.values(slugParams.params)[0];
  //console.log(isSlug);
  if (article === undefined) {
    React.useEffect(() => {
      getArticle(isSlug);
    });
  } else
    return (
      <div className={classes.article}>
        <div className={classes['article__content']}>
          <div className={classes['article__content__top']}>
            <h1>{article.title}</h1>

            <div>
              <img src={Heart} alt="heart" />
              {article.favoritesCount}
            </div>
          </div>
          <div className={classes['article__content__tags']}>
            {article.tagList.length > 0 ? (
              article.tagList.map((tag) => <span key={keys++}>{tag}</span>)
            ) : (
              <span>-</span>
            )}
          </div>
          <div className={classes['article__content__description']}>{article.description}</div>
          <div className={classes['article__content__text']}>
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        </div>
        <div className={classes['article__avatar']}>
          <div className={classes['article__avatar__info']}>
            <div className={classes['article__avatar__name']}>{article.author.username}</div>
            <div className={classes['article__avatar__date']}>
              {format(parseISO(article.createdAt), 'MMMM dd, yyyy')}
            </div>
          </div>
          <div className={classes['article__avatar__image']}>
            <img src={article.author.image} alt="avatar" />
          </div>
        </div>
      </div>
    );
};

const mapStateToProps = (state) => {
  return {
    article: state.article.article,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { getArticle } = bindActionCreators(actions, dispatch);
  return {
    getArticle,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
