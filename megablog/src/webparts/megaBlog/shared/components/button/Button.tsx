import * as React from 'react';
import styles from './Button.module.scss';

const Button = (props:any) =>{

    const {
        children,
        type,       
        onClickHandle        
    } = props

    return (
        <button type={type} className={styles.button} onClick={onClickHandle}>
                {children}
        </button>
    )
}

export default Button;