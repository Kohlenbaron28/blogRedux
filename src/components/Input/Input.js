import classes from '../pages/Sign.module.scss';

export const InputComponent = ({ register, name, errors, options, type, title }) => {
  return (
    <label>
      {title}
      <input className={classes['signUp__form_input']} type={type} placeholder={title} {...register(name, options)} />
      {errors[name] && <p className={classes['signUp__errors']}>{`${name} ${errors[name].message}`}</p>}
    </label>
  );
};
