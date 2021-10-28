import React, {useState} from 'react';
import style from './index.module.scss';
import {Link, NavLink} from 'react-router-dom'
import Button from '../Button';
import ShareModal from '../ShareModal';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../redux/actions/authActions';

export default function Nav(){
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const  [openShareModal, setOpenShareModal] = useState(false);
    const handleToggleShareModal = () => {
        setOpenShareModal(!openShareModal);
    }

    const guestLinks = [
        {
            name: "Home",
            route: "/",
            fn: null
        },
        {
            name: "Login",
            route: "/login",
            fn: null
        },
        {
            name: "Share",
            route: "/",
            fn: () => {setOpenShareModal(true)}
        }
    ]

    const authLinks = [
        {
            name: "Home",
            route: "/",
            fn: null
        },
        {
            name: "Your Articles",
            route: "/articles",
            fn: null
        },
        {
            name: "Logout",
            route: "/",
            fn: () => {dispatch(signOut())}
        }
    ]

    const navLinks = auth.isAuthenticated ? authLinks : guestLinks;
    return (
        <>
        <nav className={style["navbar"]}>
            <div className={style["nav__container"]}>
                <div className={style["nav__brand"]}>
                    M
                </div>
                
                <ul className={style["nav__menu"]}>
                    {navLinks.map((item, id) => (
                        <NavLink to={item.route} key={id}>
                            <li key={id}><Button className="nav__button" onClick={item.fn}>{item.name}</Button></li>
                        </NavLink>
                    ))}
                </ul>
            </div>
        </nav>

        <ShareModal isOpen={openShareModal} handleToggle={handleToggleShareModal} />
        </>
    )
}