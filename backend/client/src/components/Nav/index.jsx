import React from 'react';
import style from './index.module.scss';
import {Link, NavLink} from 'react-router-dom'

export default function Nav(){
    return (
        <nav className={style["navbar"]}>
            <div className={style["nav__container"]}>
                <div className={style["nav__brand"]}>
                    MediumReader
                </div>
                
                <ul className={style["nav__menu"]}>
                    <li>Home</li>
                    <li>Login</li>
                    <li>Share</li>
                </ul>
            </div>
            </nav>
    )
}