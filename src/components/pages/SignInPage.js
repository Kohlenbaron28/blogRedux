import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import classes from './Sign.module.scss';

function SignInPage({ autentification }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const token = JSON.parse(localStorage.getItem('token'));
  console.log(token);
  const onSubmit = (data) => {
    console.log(data);
    autentification(token);
  };
  console.log(errors);
  return (
    <div className={classes.signUp}>
      <div className={classes['signUp__title']}>Sign In</div>
      <div className={classes['signUp__form']}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Email address
            <input
              className={classes['signUp__form_input']}
              type="text"
              placeholder="Email address"
              {...register('email', { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
            />
            <p className={classes['signUp__errors']}>{errors.email && 'Input valid email'}</p>
          </label>

          <label>
            Password
            <input
              className={classes['signUp__form_input']}
              type="text"
              placeholder="Password"
              {...register('password', { required: true })}
            />
            <p className={classes['signUp__errors']}>{errors.password && 'Input valid password'}</p>
          </label>

          <button>Login</button>
          <p className={classes['signUp__link']}>
            Don’t have an account?
            <Link to="/sign-up">
              <span> Sign Up.</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    password: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { autentification } = bindActionCreators(actions, dispatch);
  return {
    autentification,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
