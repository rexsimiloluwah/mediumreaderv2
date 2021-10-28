import { 
    GET_ALL_ARTICLES_SUCCESS,
    GET_ALL_ARTICLES_ERROR,
    GET_USER_ARTICLES_SUCCESS,
    GET_USER_ARTICLES_ERROR,
    SAVE_ARTICLE_SUCCESS,
    SAVE_ARTICLE_ERROR,
    LOADING,
    LOADED
} from '../actions/types';

const initialState = {
    isLoading: false,
    articles: [
        {
            id: 1,
            title: "Building a Plant Disease Classifier with Tensorflow.js (PART 1)",
            category: "Programming",
            blogUrl: "https://medium.com/@rexsimiloluwa/building-a-plant-disease-classification-web-app-in-keras-and-tensorflow-js-d435829213fa",
            audioFileUrl: "https://mediumreader.s3.amazonaws.com/posts/1613301867978.mp3",
            date: new Date().getDate(),
            language: "en"
        },
        {
            id: 2,
            title: "Psychology of the Connected World",
            category: "Random",
            blogUrl: "https://medium.com/sciforce/psychology-of-the-connected-world-1c2190b0bf29",
            audioFileUrl: "https://mediumreader.s3.amazonaws.com/posts/1613408724368.mp3",
            date: new Date().getDate(),
            language: "en"
        },
        {
            id: 3,
            title: "Understanding Nigeria's Unattractive Mortgage system",
            category: "Finance",
            blogUrl: "https://nairametrics.com/2021/02/16/understanding-nigerias-unattractive-mortgage-system-and-recent-positives-from-market-players/",
            audioFileUrl: "https://mediumreader.s3.amazonaws.com/posts/1613552618106.mp3",
            date: new Date().getDate(),
            language: "en"
        }
    ]
}

export default function articleReducer(state=initialState, action){
    switch(action.type){
        case GET_ALL_ARTICLES_SUCCESS:
            return {
                ...state,
                ...action.payload
            }

        case GET_USER_ARTICLES_SUCCESS:
            return {
                ...state,
                ...action.payload
            }

        case SAVE_ARTICLE_SUCCESS:
            return {
                ...action.payload
            }

        case SAVE_ARTICLE_ERROR: 
            return {
                ...action.payload
            }

        default:
            return state
    }
}