import { useForm } from 'react-hook-form';

import classes from './Sign.module.scss';

export default function EditProfilePage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
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
                pattern: {
                  value: /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
                  message: 'Invalid URL',
                },
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
