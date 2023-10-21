import * as React from 'react';
import styles from './InputBox.module.scss';
import { IInputBoxProps } from './IInputBoxProps';


export default function InputBox(props:IInputBoxProps)
{
  
    return (
        <div className={`${styles.inputBox} ${props.className}`}>
            <div className={styles.inputBoxHeader}>
                <label htmlFor="Form" className={styles.lblHeader}>{props.label}</label>
                <label htmlFor="ContentType" className={styles.contentType}>Content Type</label>
            </div>
            <div className={styles.inputBoxContent}>
                <input type="number" className={styles.currencyInput} value={props.amount} 
                onChange={(e)=> props.onAmountChange(e.target.value)} placeholder="Amount"
                />
                <select 
                className={styles.currencyType} 
                onChange={(e)=> props.onCurrencyChange(e.target.value)} 
                value={props.selectCurrency} 
                >
                    {props.currencyOptions.map((currency) =>{
                        console.log(currency);
                        return <option key={currency} value={currency}>{currency}</option>    
                    })}
                    
                </select>
            </div>
      </div>
    );   
    

}