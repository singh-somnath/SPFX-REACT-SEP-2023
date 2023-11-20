import * as React  from 'react';
import styles from './input.module.scss';
import { useId } from '@fluentui/react-hooks'

const Input = (props:any,ref: React.LegacyRef<HTMLInputElement>) =>{

    const {
        type,        
        required,
        readOnly,
        label,        
        ariaInvalid,
        name  
    } = props

    const inputId = useId();

    return (
        <div className={styles.inputContainer} >
                {label && <label  htmlFor={inputId}>{label}</label>}
                <input 
                    type={type}                     
                    ref={ref} 
                    required={required} 
                    readOnly={readOnly} 
                    id={inputId}    
                    {...props}                
                />
                {ariaInvalid && <div className={styles['inputContainer-error']}>* {String(name).toUpperCase()} is required.</div>}
        </div>
         
    )
}

export default React.forwardRef(Input);