import React from 'react';
import style from './index.module.scss';
import Button from '../Button';
import Modal from '../../components/Modal';
import {FormGroup} from '../Form';
import FormSelect from '../FormSelect';
import {Field, Form, Formik, ErrorMessage} from 'formik';
import articleCategories from '../../utils/articleCategories';
import * as Yup from 'yup'; 

export default function SaveArticleModal({isOpen, handleToggle, handleSaveArticle}) {
    return (
    <Modal isOpen={isOpen} toggleModal={handleToggle}>
        <h3>Save Article</h3>
        <p>Save now, Listen later.</p>
        <SaveArticleForm handleSaveArticle={handleSaveArticle}/>
    </Modal>
    )
}

const SaveArticleForm = ({handleSaveArticle}) => {
    const articleCategoryOptions = {

    }
    const initialValues = {
        title: '',
        category: '',
        public: false
    }

    const saveArticleSchema = Yup.object({
        'title': Yup.string().required("Article Title is required."),
        'category': Yup.string().required("Article category is required.")
    })

    return (
        <Formik
        initialValues={initialValues}
        validationSchema={saveArticleSchema}
        onSubmit={ fields => {
            alert(JSON.stringify(fields));
            handleSaveArticle(fields);
        }}
        >
        {
          ({errors, touched, isValid, dirty}) => (
              <Form>
                  <FormGroup>
                      <label>Title: -</label>
                      <Field 
                        placeholder="Enter Article Title"
                        type="text" name="title" className = {errors.title && touched.title ? "input--error":null}
                      />
                      <ErrorMessage name="title" component="span" className="text--error" />
                  </FormGroup>

                  <FormGroup>
                      <label>Select Article Category: -</label>
                      <Field as="select" name="category">
                        {   
                            <>
                            <option value="" disabled>Select a Category</option>
                            {
                                articleCategories.map((item, id)=>(
                                    <option key={id} value={item.toLowerCase()}>{item}</option>
                                ))
                            }
                            </>
                        }
                      </Field>
                  </FormGroup>

                  <label>
                    <Field type="checkbox" name="public" />
                    <span style={{padding: '.5rem'}}>Make Public</span>
                  </label>
                        
                  <Button type="submit" className="btn--success" disabled={!(isValid && dirty)}>Save</Button>
              </Form>
          )
        }

        </Formik>
    )
}