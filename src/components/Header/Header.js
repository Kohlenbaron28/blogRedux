import { Link } from 'react-router-dom';

import classes from './Header.module.scss';

const Header = () => {
  return (
    <div className={classes.header}>
      <Link to="/">
        <div className={classes['header__title']}>Realworld Blog</div>
      </Link>
      <div className={classes['header__registr']}>
        <button className={classes['header__registr_one']}>Sign In</button>
        <button className={classes['header__registr_two']}>Sign Up</button>
      </div>
    </div>
  );
};
export default Header;
