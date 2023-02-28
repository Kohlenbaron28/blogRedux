import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { InputComponent } from '../Input/Input';
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
    localStorage.setItem('password', JSON.stringify(data.password));
    registration(data);
  };

  console.log(errors);
  console.log(user);
  return (
    <div className={classes.signUp}>
      <div className={classes['signUp__title']}>Create new account</div>
      <div className={classes['signUp__form']}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputComponent
            register={register}
            errors={errors}
            name="username"
            options={{
              required: { value: true, message: 'is required' },
              minLength: { value: 3, message: 'min length is 3' },
              maxLength: {
                value: 20,
                message: 'Max length is 20',
              },
            }}
            title="Username"
            type="text"
          />
          <InputComponent
            register={register}
            errors={errors}
            name="email"
            options={{ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ }}
            type="text"
            title="Email"
          />
          <InputComponent
            register={register}
            errors={errors}
            name="password"
            options={{
              required: true,
              minLength: {
                value: 6,
                message: 'Min length is 6',
              },
              maxLength: {
                value: 40,
                message: 'Max length is 40',
              },
            }}
            type="text"
            title="Password"
          />
          <InputComponent
            register={register}
            errors={errors}
            name="repeat password"
            options={{ required: true, validate: (value) => value === watch('password') }}
            type="text"
            title="Repeat Password"
          />

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
