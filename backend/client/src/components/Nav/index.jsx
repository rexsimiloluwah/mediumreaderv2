import React from 'react';
import style from './index.module.scss';
import {Link, NavLink} from 'react-router-dom'
import Button from '../Button';

export default function Nav(){

    const guestLinks = [
        {
            name: "Home",
            route: "/",
            fn: () => {console.log("Home")}
        },
        {
            name: "Login",
            route: "/login",
            fn: () => {console.log("Login")}
        },
        {
            name: "Share",
            route: "/",
            fn: () => {console.log("Share")}
        }
    ]
    return (
        <nav className={style["navbar"]}>
            <div className={style["nav__container"]}>
                <div className={style["nav__brand"]}>
                    M
                </div>
                
                <ul className={style["nav__menu"]}>
                    {guestLinks.map((item, id) => (
                        <NavLink to={item.route}>
                            <li key={id}><Button className="nav__button" onClick={item.fn}>{item.name}</Button></li>
                        </NavLink>
                    ))}
                </ul>
            </div>
            </nav>
    )
}