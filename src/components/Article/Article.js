import { parseISO, format } from 'date-fns';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import Heart from '../../img/heart.png';
import * as actions from '../../store/actions';

import classes from './Article.module.scss';

let keys = 1;

const Article = ({ getArticle, slug, title, description, body, tagList, favoritesCount, name, img, createdAt }) => {
  return (
    <div className={classes.article}>
      <div className={classes['article__content']}>
        <div className={classes['article__content__top']}>
          <Link to={`/articles/${slug}`}>
            <h1
              onClick={() => {
                getArticle(slug);
              }}
            >
              {title}
            </h1>
          </Link>
          <div>
            <img src={Heart} alt="heart" />
            {favoritesCount}
          </div>
        </div>
        <div className={classes['article__content__tags']}>
          {tagList.length > 0 ? tagList.map((tag) => <span key={keys++}>{tag}</span>) : <span>-</span>}
        </div>
        <div className={classes['article__content__description']}>{description}</div>
        <div className={classes['article__content__text']}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
      <div className={classes['article__avatar']}>
        <div className={classes['article__avatar__info']}>
          <div className={classes['article__avatar__name']}>{name}</div>
          <div className={classes['article__avatar__date']}>{format(parseISO(createdAt), 'MMMM dd, yyyy')}</div>
        </div>
        <div className={classes['article__avatar__image']}>
          <img src={img} alt="avatar" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    actionsSlug: state.slug,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { sendSlug, getArticle } = bindActionCreators(actions, dispatch);
  return {
    sendSlug,
    getArticle,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
