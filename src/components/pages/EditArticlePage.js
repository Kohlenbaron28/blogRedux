import * as React from 'react';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';

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

function EditArticlePage({ editArticle, slug }) {
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
    editArticle(token, data, slug);
    console.log(data);
  };

  return (
    <div className={classes.signUp}>
      <div className={classes['signUp__title']}>Edit article</div>
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
                <Button type="button" onClick={() => remove(index)}>
                  Delete
                </Button>
              </section>
              <hr />
            </div>
          );
        })}

        <Button onClick={() => append()}>Add tag</Button>

        <input
          type="submit"
          value="Send"
          style={{
            border: ' 1px solid blue',
            background: 'inherit',
            padding: 5,
            borderRadius: 5,
            cursor: 'pointer',
            marginLeft: 10,
          }}
        />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAutorized: state.isAutorized,
    article: state.article,
    slug: state.slug,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { editArticle } = bindActionCreators(actions, dispatch);
  return {
    editArticle,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticlePage);
