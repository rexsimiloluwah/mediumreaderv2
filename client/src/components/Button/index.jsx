import React from 'react';
import style from './index.module.scss';

export default function Button({type, className, disabled, ...props}){
    return(
        <button type={type} disabled={disabled} className={`${style[className]}`} {...props}>{props.children}</button>
    )
}