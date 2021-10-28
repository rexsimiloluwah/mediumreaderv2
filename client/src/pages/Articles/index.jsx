import React, {useEffect, useState} from 'react';
import style from './index.module.scss';
import AudioPlayer from '../../components/AudioPlayer';
import { useSelector } from 'react-redux';

export default function Articles(){
    const [articles, setArticles] = useState([]);
    const articles_data = useSelector(state => state.article.articles);
    console.log(articles_data)

    useEffect(()=> {
        setArticles(articles_data);
    })

    return (
        <div className={style.articles__container}>
            { articles ? 
                <>
                <h1>Your Articles</h1>
                <p><i className="bx bx-headphone"></i> Listen to your saved articles</p>
                <div className={style.article__cards}>
                    {
                        articles.map((item, id) => (
                            <ArticleCard article={item} />
                        ))
                    }
                </div>
                </>  : ""
            }
        </div>
    )
}

const ArticleCard = ({article}) => {
    return (
        <div className={style.article__card}>
            <h4>{article.title}</h4>
            <p>{article.category}</p>
            <AudioPlayer src = {article.audioFileUrl}/>
        </div>
    )
}