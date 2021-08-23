import React from 'react';
import style from './index.module.scss';
import AudioPlayer from '../../components/AudioPlayer';

export default function Articles(){
    return (
        <div className={style.articles__container}>
            <h1>Your Articles</h1>
            <p><i className="bx bx-headphone"></i> Listen to your saved articles</p>

            <div className={style.article__cards}>
                <div className={style.article__card}>
                    <h4>Quantum Mechanics: A gentle introduction</h4>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, suscipit.</p>
                    <AudioPlayer src = ""/>
                </div>

                <div className={style.article__card}>
                    <h4>Quantum Mechanics: A gentle introduction</h4>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, suscipit.</p>
                </div>

                <div className={style.article__card}>
                    <h4>Quantum Mechanics: A gentle introduction</h4>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, suscipit.</p>
                </div>

                <div className={style.article__card}>
                    <h4>Quantum Mechanics: A gentle introduction</h4>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, suscipit.</p>
                </div>

                <div className={style.article__card}>
                    <h4>Quantum Mechanics: A gentle introduction</h4>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, suscipit.</p>
                </div>
            </div>
        </div>
    )
}