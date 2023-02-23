import * as React from 'react';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import classes from './Sign.module.scss';

const ConditionalInput = ({ control, index, field }) => {
  const value = useWatch({
    name: 'tags',
    control,
  });
  return (
    <Controller
      control={control}
      name={`tags.${index}.firstName`}
      render={({ field }) => (value?.[index]?.checkbox === 'on' ? <input {...field} /> : null)}
      defaultValue={field.firstName}
    />
  );
};

function NewArticlePage({ postNewArticle }) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });
  const token = JSON.parse(localStorage.getItem('token'));
  const onSubmit = (data) => {
    postNewArticle(token, data);
    console.log(data);
  };

  return (
    <div className={classes.signUp}>
      <div className={classes['signUp__title']}>Create new article</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Title
          <input
            className={classes['signUp__form_input']}
            type="text"
            placeholder="Title"
            {...register('title', { required: true })}
          />
          <p className={classes['signUp__errors']}>{errors.title && 'Input valid username'}</p>
        </label>
        <label>
          Short description
          <input
            className={classes['signUp__form_input']}
            type="text"
            placeholder="Short description"
            {...register('description', { required: true })}
          />
          <p className={classes['signUp__errors']}>{errors.description && 'Input valid email'}</p>
        </label>

        <label>
          Text
          <input
            className={classes['signUp__form_input']}
            type="text"
            placeholder="Text"
            {...register('text', {
              required: true,
            })}
          />
          <p className={classes['signUp__errors']}>{errors.text?.message}</p>
        </label>
        <h3>Tags</h3>
        {fields.map((field, index) => {
          const id = `tags.${index}.checkbox`;
          return (
            <div key={field.id}>
              <section>
                <input type="text" id={id} {...register(`tags.${index}.firstName`)} />
                <ConditionalInput {...{ control, index, field }} />
                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </section>
              <hr />
            </div>
          );
        })}

        <button type="button" onClick={() => append()}>
          Add tag
        </button>

        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAutorized: state.isAutorized,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { postNewArticle } = bindActionCreators(actions, dispatch);
  return {
    postNewArticle,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewArticlePage);
