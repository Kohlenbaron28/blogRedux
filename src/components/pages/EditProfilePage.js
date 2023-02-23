import { useForm } from 'react-hook-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import classes from './Sign.module.scss';

function EditProfilePage({ image, password, editProfile }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const token = JSON.parse(localStorage.getItem('token'));
  const onSubmit = (data) => {
    console.log(data.password);
    // localStorage.setItem('password', JSON.stringify(data.password));
    editProfile(token, data);
  };
  console.log(image, password);
  return (
    <div className={classes.signUp}>
      <div className={classes['signUp__title']}>Edit Profile</div>
      <div className={classes['signUp__form']}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Username
            <input
              className={classes['signUp__form_input']}
              type="text"
              placeholder="Username"
              {...register('username', { required: true })}
            />
            <p className={classes['signUp__errors']}>{errors.username && 'Input valid username'}</p>
          </label>
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
            New password
            <input
              className={classes['signUp__form_input']}
              type="text"
              placeholder="New password"
              {...register('newPassword', {
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
            />
            <p className={classes['signUp__errors']}>{errors.newPassword?.message}</p>
          </label>
          <label>
            Avatar image (url)
            <input
              className={classes['signUp__form_input']}
              type="url"
              placeholder="Avatar image"
              {...register('img', {
                required: false,
                // pattern: {
                //   value: /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
                //   message: 'Invalid URL',
                // },
              })}
            />
            <p className={classes['signUp__errors']}>{errors.img?.message}</p>
          </label>

          <button>Save</button>
        </form>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    password: state.user,
    image: state.image,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { editProfile } = bindActionCreators(actions, dispatch);
  return {
    editProfile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
