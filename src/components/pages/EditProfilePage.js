import { useForm } from 'react-hook-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { InputComponent } from '../Input/Input';
import * as actions from '../../store/actions';

import classes from './Sign.module.scss';

function EditProfilePage({ editProfile }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const token = JSON.parse(localStorage.getItem('token'));
  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem('password', JSON.stringify(data.newPasswords));
    editProfile(token, data);
  };

  return (
    <div className={classes.signUp}>
      <div className={classes['signUp__title']}>Edit Profile</div>
      <div className={classes['signUp__form']}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputComponent
            register={register}
            errors={errors}
            name="username"
            options={{
              required: { value: true, message: 'is required' },
              minLength: { value: 3, message: 'min length is 3' },
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
            name="newPassword"
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
            title="New Password"
          />
          <InputComponent
            register={register}
            errors={errors}
            name="img"
            options={{
              required: false,
            }}
            type="url"
            title="Avatar image (url)"
          />

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
