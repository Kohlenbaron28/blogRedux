import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import classes from './Sign.module.scss';

function SignUpPage({ user, registration }) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { agryy: false } });
  const onSubmit = (data) => {
    console.log(data);
    registration(data);
  };

  console.log(errors);
  console.log(user);
  return (
    <div className={classes.signUp}>
      <div className={classes['signUp__title']}>Create new account</div>
      <div className={classes['signUp__form']}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Username
            <input
              {...register('username', {
                required: true,
                minLength: {
                  value: 3,
                  message: 'Min length is 3',
                },
                maxLength: {
                  value: 20,
                  message: 'Max length is 20',
                },
              })}
              className={classes['signUp__form_input']}
              type="text"
              placeholder="Username"
            />
            <p className={classes['signUp__errors']}>{errors.username?.message}</p>
          </label>

          <label>
            Email address
            <input
              {...register('email', {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
              className={classes['signUp__form_input']}
              type="text"
              placeholder="Email address"
            />
            <p className={classes['signUp__errors']}>{errors.email && 'Input valid email'}</p>
          </label>

          <label>
            Password
            <input
              {...register('password', {
                required: true,
                minLength: {
                  value: 6,
                  message: 'Min length is 6',
                },
                maxLength: {
                  value: 40,
                  message: 'Max length is 40',
                },
              })}
              className={classes['signUp__form_input']}
              type="text"
              placeholder="Password"
            />
            <p className={classes['signUp__errors']}>{errors.password?.message}</p>
          </label>

          <label>
            Repeat Password
            <input
              {...register('repeat password', {
                required: true,
                validate: (value) => value === watch('password'),
              })}
              className={classes['signUp__form_input']}
              type="text"
              placeholder="Password"
            />
            <p className={classes['signUp__errors']}>{errors['repeat password'] && 'Dont match'}</p>
          </label>
          <label className={classes['sideBar__label']}>
            <input
              {...register('agryy', {
                required: true,
                validate: (value) => value === true,
              })}
              type="checkbox"
              className={classes['sideBar__input']}
            />
            <span className={classes['sideBar__chekBox']}></span>I agree to the processing of my personal information
            <p className={classes['signUp__errors']} style={{ marginLeft: -32 }}>
              {errors['agryy'] && 'Check the box'}
            </p>
          </label>
          <button type="submit">Create</button>
          <p className={classes['signUp__link']}>
            Already have an account?
            <Link to="/sign-in">
              <span> Sign In.</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  const { registration } = bindActionCreators(actions, dispatch);
  return {
    registration,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
