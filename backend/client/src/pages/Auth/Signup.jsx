import React from 'react';
import style from './index.module.scss';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {FormGroup, FormGroupRow} from '../../components/Form';
import {Link} from 'react-router-dom';
import Button from '../../components/Button';
import * as Yup from 'yup';


export default function Signup(){
    return (
        <div className={style.auth__container}>
            <div className={style.signup__container}>
                <h3><i className="bx bx-user"></i> Signup</h3>
                <SignupForm />
                <div className={style.extra__links}>
                    <div><Link to="/login">Have an Account, Login?</Link></div>
                    <div><Link to="/">Home</Link></div> 
                </div>
            </div>
        </div>
    )
}

function SignupForm(){
    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    }

    const signupSchema = Yup.object().shape({
        firstname: Yup.string().required("Firstname is required."),
        lastname: Yup.string().required("Lastname is required."),
        email: Yup.string().email("Email Address is Invalid.")
                            .required("Email Address is Required."),
        password: Yup.string().min(8)
                                .required("Password is required.")
    })

    return(
        <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={ fields => {
                alert(JSON.stringify(fields));
            }}
        >
            {
                ({errors, touched, isValid, dirty})=> (
                    <Form>
                        <FormGroupRow>
                            <FormGroup>
                                <label>Firstname</label>
                                <Field 
                                    placeholder="Your Firstname"
                                    type="text" name="firstname"
                                    className = {errors.firstname && touched.firstname ? "input--error" : null}
                                />
                                <ErrorMessage name="firstname" component="span" className="text--error" />
                            </FormGroup>

                            <FormGroup>
                                <label>Lastname</label>
                                <Field 
                                    placeholder="Your Lastname"
                                    type="text" name="lastname"
                                    className = {errors.lastname && touched.lastname ? "input--error" : null}
                                />
                                <ErrorMessage name="lastname" component="span" className="text--error" />
                            </FormGroup>
                        </FormGroupRow>
                        <FormGroup>
                            <label>Email address</label>
                            <Field 
                                placeholder="Your Email Address"
                                type="text" name="email"
                                className = {errors.email && touched.email ? "input--error" : null}
                            />
                            <ErrorMessage name="email" component="span" className="text--error" />
                        </FormGroup>

                        <FormGroup>
                            <label>Password</label>
                            <Field 
                                placeholder="Your password"
                                type="password" name="password"
                                className= {errors.password && touched.password ? "input--error" : null}
                            />
                            <ErrorMessage name="password" component="span" className="text--error" />
                        </FormGroup>

                        <Button type="submit" className="btn--success" disabled={!(isValid && dirty)}>Signup</Button>
                    </Form>
                )
            }

        </Formik>
    )
}