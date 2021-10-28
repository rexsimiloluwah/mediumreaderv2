import React,{useEffect} from 'react';
import style from './index.module.scss';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {FormGroup, FormGroupRow} from '../../components/Form';
import {Link} from 'react-router-dom';
import Button from '../../components/Button';
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithEmailAndPassword, signInWithGoogle } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';


export default function Login(){
    const dispatch = useDispatch();
    const history = useHistory();
    const error = useSelector(state => state.error);
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(clearErrors());
    }, [dispatch])
    const handleLoginWithEmailAndPassword = (data) => {
        dispatch(signInWithEmailAndPassword(data));
    }

    const handleLoginWithGoogle = (e) => {
        e.preventDefault();
        dispatch(signInWithGoogle());
    }


    return (
        <div className={style.auth__container}>
            
            <div className={style.login__container}>
                <h3><i className="bx bx-user"></i> Login</h3>
                <LoginForm 
                    handleLoginWithGoogle={handleLoginWithGoogle}
                    handleLoginWithEmailAndPassword={handleLoginWithEmailAndPassword}
                />
                <div className={style.extra__links}>
                    <div><Link to="/signup">No Account? Signup <i className="bx bx-right-arrow-alt"></i></Link></div>
                    <div><Link to="/">Forgot Password</Link></div> 
                </div>
            </div>
        </div>
    )
}

function LoginForm({
    handleLoginWithGoogle,
    handleLoginWithEmailAndPassword
}){
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
                // console.log(fields);
                handleLoginWithEmailAndPassword(fields);
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

                        <div id={style.or__seperator}>OR</div>
                        <Button className="google__login" onClick={handleLoginWithGoogle}>
                        <img className="google__icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                        Sign in with Google</Button>
                    </Form>
                )
            }

        </Formik>
    )
}