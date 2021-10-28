import { 
    GET_ALL_ARTICLES_SUCCESS,
    GET_ALL_ARTICLES_ERROR,
    GET_USER_ARTICLES_SUCCESS,
    GET_USER_ARTICLES_ERROR,
    SAVE_ARTICLE_SUCCESS,
    SAVE_ARTICLE_ERROR 
} from './types';

export const getAllArticles = () => (dispatch) => {
    dispatch({
        type: GET_ALL_ARTICLES_SUCCESS,
        payload: {
            length: 12,
            message: "Testing GET_ALL_ARTICLES",
            data: []
        }
    })
}

export const saveArticle = (data) => (dispatch, getState, {getFirebase, getFirestore}) => {
    console.log(data);
    const firestore = getFirestore();
    firestore.collection('articles').add({
        ...data,
        userId: 1,
        createdAt: new Date()
    }).then((result) => {
        console.log(result);
        dispatch({
            type: SAVE_ARTICLE_SUCCESS,
            payload: {
                status: true,
                message: 'Successfully saved article.',
                data: data
            }
        })
    }).catch((error) => {
        console.error(error);
        dispatch({
            type: SAVE_ARTICLE_ERROR,
            payload: {
                status: false, 
                message: error.message 
            }
        })
    })
}

export const getUserArticles = () => (dispatch) => {
    dispatch({
        type: GET_USER_ARTICLES_SUCCESS,
        payload: {
            status: true,
            user: 'Similoluwa Okunowo',
            message: "TESTING GET_USER_ARTICLES",
            data: []
        }
    })
}
