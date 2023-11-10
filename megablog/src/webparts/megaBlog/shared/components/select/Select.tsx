import * as React  from 'react';
import {} from 'react';

const Select = (props:any,ref:any) =>{

    const {
        options,
        className,
        label       
    } = props

    const inputId = "select-element"  + Date.now();

    return (
        <div>
                {label && <label className='' htmlFor={inputId}>{label}</label>}
                 <select id={inputId} className={`${className}`} ref={ref} {...props} >
                 {options.map((item:string)=>(
                     <option key={item} value={item}>{item}</option>
                  ))}
                 </select>
        </div>
         
    )
}

export default React.forwardRef(Select);