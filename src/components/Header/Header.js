import { Link } from 'react-router-dom';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Avatar from '../../img/avatar.png';
import * as actions from '../../store/actions';

import classes from './Header.module.scss';

const Header = ({ logOut }) => {
  const url = JSON.parse(localStorage.getItem('image'));
  //   React.useEffect(()=>{

  //   },[url])
  return (
    <div className={classes.header}>
      <Link to="/">
        <div className={classes['header__title']}>Realworld Blog</div>
      </Link>
      {JSON.parse(localStorage.getItem('isAutorized')) === true ? (
        <div>
          <button>Create article</button>
          <div>
            {JSON.parse(localStorage.getItem('username'))}
            <Link to="/profile">
              <img
                style={{ width: 50, height: 50, borderRadius: '50%' }}
                src={url !== undefined ? url : Avatar}
                alt="avatar"
              />
            </Link>
          </div>
          <button onClick={() => logOut()}>Log Out</button>
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
