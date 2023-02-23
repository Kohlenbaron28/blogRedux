import { Link } from 'react-router-dom';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';

import Avatar from '../../img/avatar.png';
import * as actions from '../../store/actions';

import classes from './Header.module.scss';

const Header = ({ logOut }) => {
  const url = JSON.parse(localStorage.getItem('image'));
  return (
    <div className={classes.header}>
      <Link to="/">
        <div className={classes['header__title']}>Realworld Blog</div>
      </Link>
      {JSON.parse(localStorage.getItem('isAutorized')) === true ? (
        <div className={classes['header__title_info']}>
          <Link to="/new-article">
            <Button>Create article</Button>
          </Link>
          <div className={classes['header__title_info']}>
            {JSON.parse(localStorage.getItem('username'))}
            <Link to="/profile">
              <img
                style={{ width: 50, height: 50, borderRadius: '50%' }}
                src={url !== undefined ? url : Avatar}
                alt="avatar"
              />
            </Link>
          </div>
          <Button onClick={() => logOut()}>Log Out</Button>
        </div>
      ) : (
        <div className={classes['header__registr']}>
          <Link to="/sign-in">
            <button className={classes['header__registr_one']}>Sign In</button>
          </Link>

          <Link to="/sign-up">
            <button className={classes['header__registr_two']}>Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAutorized: state.isAutorized,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { logOut } = bindActionCreators(actions, dispatch);
  return {
    logOut,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
