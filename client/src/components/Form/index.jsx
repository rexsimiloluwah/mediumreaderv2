import React from 'react';
import style from './index.module.scss';

export function FormGroup({children}){
    return (
        <div className={style.form__group}>{children}</div>
    )
}

export function FormGroupRow({children}){
    return (
        <div className={style["form__group--row"]}>{children}</div>
    )
}