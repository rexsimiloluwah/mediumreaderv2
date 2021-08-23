import React from 'react';
import style from './index.module.scss';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {FormGroup, FormGroupRow} from '../../components/Form';
import {Link} from 'react-router-dom';
import Button from '../../components/Button';
import * as Yup from 'yup';


export default function Login(){
    return (
        <div className={style.auth__container}>
            
            <div className={style.login__container}>
                <h3><i className="bx bx-user"></i> Login</h3>
                <LoginForm />
                <div className={style.extra__links}>
                    <div><Link to="/signup">No Account? Signup</Link></div>
                    <div><Link to="/">Home</Link></div> 
                </div>
            </div>
        </div>
    )
}

function LoginForm(){
    const initialValues = {
        email: '',
        password: ''
    }

    const loginSchema = Yup.object().shape({
        email: Yup.string().email("Email Address is Invalid.")
                            .required("Email Address is Required."),
        password: Yup.string().min(8)
                                .required("Password is required.")
    })

    return(
        <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={ fields => {
                alert(JSON.stringify(fields));
            }}
        >
            {
                ({errors, touched, isValid, dirty})=> (
                    <Form>
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

                        <Button type="submit" className="btn--success" disabled={!(isValid && dirty)}>Login</Button>
                    </Form>
                )
            }

        </Formik>
    )
}