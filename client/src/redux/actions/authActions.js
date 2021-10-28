import { toast } from 'react-toastify';
import { returnErrors } from './errorActions';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_TOKEN_ERROR,
    LOADING,
    LOADED,
    REFRESH_AUTH_SUCCESS,
    LOGOUT_SUCCESS
} from './types';

export const signUp = (userData) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log(userData);
    dispatch({
        type: LOADING,
        payload: {}
    })
    const {email,password, firstname, lastname} = userData;
    firebase.auth().createUserWithEmailAndPassword(
        email,
        password
    ).then(response => {
        console.log(response);
        const {user} = response;
        user.updateProfile({
            displayName: firstname + ' ' + lastname
        })
        return firestore.collection('users')
                .doc(user.uid)
                .set({
                    firstName: firstname,
                    lastName: lastname,
                    displayName: firstname + ' ' + lastname
                }).then(() => {
                    dispatch({type: REGISTER_SUCCESS})
                    dispatch({
                        type: LOADED
                    })
                    toast.success("Sign Up successful, Go back to Login.");

                }).catch(error => {
                    console.error(error);
                    dispatch({type: REGISTER_FAIL})
                    dispatch({
                        type: LOADED
                    })
                    dispatch(returnErrors(error.message, error.status, 'REGISTER_FAIL'));
                    toast.error(error.message);
                })
    }).catch(error =>{
        console.error(error);
        dispatch({
            type: LOADED,
            payload: {}
        })
        dispatch({
            type: REGISTER_FAIL,
            payload: {}
        })
        dispatch(returnErrors(error.message, error.status, 'REGISTER_FAIL'));
        toast.error(error.message);
    })
}

export const signInWithEmailAndPassword = (userData) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    console.log(userData);
    const {email, password} = userData;
    console.log(email, password);
    firebase.auth()
        .signInWithEmailAndPassword(
            email,
            password
        )
        .then((response) => {
            const {user} = response;
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    status: true,
                    name: user.displayName,
                    email: user.email,
                    id: user.providerData.uid,
                    uid: user.uid
                }
            })
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: LOGIN_FAIL,
                payload: {
                    status: false,
                    error: error
                }
            })
            toast.error(error.message);
            dispatch(returnErrors(error.message, error.status, 'LOGIN_FAIL'));
            
        })
}

export const signInWithGoogle = () => (dispatch, getState, {getFirebase, getFirestore}) => {
    //console.log("[TESTING] Login with Google");
    const firebase = getFirebase()

    firebase
        .login({
            provider: "google",
            type: "popup"
        })
        .then((response) => {
            console.log(response);
            const {additionalUserInfo: {profile}, user, credential} = response;
            console.log(profile);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    status: true,
                    name: profile.name,
                    email: profile.email,
                    id: profile.id,
                    uid: user.uid,
                }
            })
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: LOGIN_FAIL,
                payload: {
                    status: false,
                    error: error
                }
            })
            dispatch(returnErrors(error.message, error.status, 'LOGIN_FAIL'));
        })
}

export const signOut = () => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut()
        .then((response) => {
            console.log('Logout successful');
            console.log(response);
            dispatch({
                type: LOGOUT_SUCCESS
            })
        })
        .catch(error => {
            console.error(error);
            dispatch(returnErrors(error.message, error.status, 'LOGOUT_FAIL'));
        })
}

export const loadUser = () => (dispatch, getState, {getFirebase})=> {
    const firebase = getFirebase();

    firebase.auth()
        .onAuthStateChanged((user)=>{
            if(user){
                console.log(user);
                console.log(user.uid)
                dispatch({
                    type: REFRESH_AUTH_SUCCESS,
                    payload: {
                        status: true,
                        name: user.displayName,
                        email: user.email,
                        id: user.providerData.uid,
                        uid: user.uid
                    }
                })
            }
        })
        
}