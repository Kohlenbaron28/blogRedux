import * as React from 'react';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { InputComponent } from '../Input/Input';
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
        <InputComponent
          register={register}
          errors={errors}
          name="title"
          options={{
            required: true,
          }}
          title="Title"
          type="text"
        />
        <InputComponent
          register={register}
          errors={errors}
          name="description"
          options={{
            required: true,
          }}
          title="Short description"
          type="text"
        />
        <InputComponent
          register={register}
          errors={errors}
          name="text"
          options={{
            required: true,
          }}
          title="Text"
          type="text"
        />
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
