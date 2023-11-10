import * as React  from 'react';
import {} from 'react';

const Input = (props:any,ref:any) =>{

    const {
        type,
        className,
        required,
        readOnly,
        label       
    } = props

    const inputId = "input-element"  + Date.now();

    return (
        <div>
                {label && <label className='' htmlFor={inputId}>{label}</label>}
                <input 
                    type={type} 
                    className={`${className}`} 
                    ref={ref} 
                    required={required} 
                    readOnly={readOnly} 
                    id={inputId}    
                    {...props}                
                />
        </div>
         
    )
}

export default React.forwardRef(Input);