import * as React from 'react';

const Button = (props:any) =>{

    const {
        children,
        type,
        className,
        onClickHandle        
    } = props

    return (
        <button type={type} className={`${className}`} onClick={onClickHandle}>
                {children}
        </button>
    )
}

export default Button;