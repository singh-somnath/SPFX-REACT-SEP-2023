import * as React  from 'react';
import styles from './select.module.scss';
import { useId } from '@fluentui/react-hooks';

const Select = (props:any,ref:any) =>{

    const {
        options,
        label,       
        ariaInvalid,        
        name
    } = props

    const inputId = useId();

    return (
        <div className={styles.selectContainer}>
                {label && <label className='' htmlFor={inputId}>{label}</label>}
                 <select id={inputId}  ref={ref} {...props} >
                 {options.map((item:string)=>(
                     <option key={item} value={item}>{item}</option>
                  ))}
                 </select>
                 {ariaInvalid && <div className={styles['selectContainer-error']}>* {String(name).toUpperCase()} is required.</div>}
        </div>
         
    )
}

export default React.forwardRef(Select); 