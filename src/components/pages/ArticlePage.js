import { useLocation, matchPath, Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { parseISO, format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Alert, Button, Space } from 'antd';

import * as actions from '../../store/actions';
import Heart from '../../img/heart.png';
import classes from '../Article/Article.module.scss';

let keys = 1;

const ArticlePage = ({ article, getArticle, slug, alertValue, changeAlertValue, deleteArticle }) => {
  console.log('article', article);
  const { pathname } = useLocation();
  const slugParams = matchPath('/articles/*', pathname);
  const isSlug = Object.values(slugParams.params)[0];
  let token = JSON.parse(localStorage.getItem('token'));
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
              article.tagList.map((tag) => (
                <span className={classes['article__content__tags_tag']} key={keys++}>
                  {tag}
                </span>
              ))
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
          <div>
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
          <div>
            <Link to={`/articles/${slug}/edit`}>
              <Button>Edit</Button>
            </Link>
            <Button danger onClick={() => changeAlertValue()}>
              Delete
            </Button>
            <Alert
              style={{ display: `${alertValue}` }}
              description="Are you sure to delete this article?"
              type="warning"
              action={
                <Space direction="vertical">
                  <Button size="small" type="primary" onClick={() => deleteArticle(token, slug)}>
                    Yes
                  </Button>
                  <Button size="small" danger type="ghost" onClick={() => changeAlertValue()}>
                    No
                  </Button>
                </Space>
              }
              unclosable
            />
          </div>
        </div>
      </div>
    );
};

const mapStateToProps = (state) => {
  return {
    article: state.article.article,
    slug: state.slug,
    alertValue: state.alertValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { getArticle, changeAlertValue, deleteArticle } = bindActionCreators(actions, dispatch);
  return {
    getArticle,
    changeAlertValue,
    deleteArticle,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
