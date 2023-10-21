import * as React from 'react';
import {useState} from 'react';
import styles from './CurrencyConverter.module.scss';

import InputBox  from './components/InputBox';
import useCurrencyInfo from '../../hooks/useCurrencyInfo';

export default function CurrencyConverter(props:any){
    const [amount,setAmount] = useState(0);
    const [form,setForm] = useState("usd");
    const [to,setTo] = useState("inr"); 
    const [convertedAmount,setConvertedAmount] = useState(0);

    const currency:any = useCurrencyInfo(form);

    const currencyOptions = Object.keys(currency);

    const convert = () =>{
        setConvertedAmount(amount * currency[to])
    }

    const swap = () => {
        const currentForm = form;
        setForm(to);
        setTo(currentForm);
        const currentAmount = amount;
        setAmount(convertedAmount);
        setConvertedAmount(currentAmount);
    }
   const clsMarginTop = `${styles['margin-top']}`

    return(
        <div className={styles.main}>
           <div className={styles.container}>
                <InputBox 
                    label="From" 
                    className="" 
                    amount={amount} 
                    selectCurrency ={form} 
                    onAmountChange = {(amount:number) => {setAmount(amount);}} 
                    onCurrencyChange={(currency:string)=> setForm(currency)} 
                    currencyOptions={currencyOptions} 
                />

                <div className={styles.swapBox} onClick={swap}>Swap</div>

                <InputBox 
                    label="To" 
                    className={clsMarginTop}
                    amount ={convertedAmount} 
                    selectCurrency ={to}  
                    onCurrencyChange={(currency:string)=> setTo(currency)} 
                    onAmountChange =  {(amount:number) => {setAmount(amount)}} 
                    currencyOptions={currencyOptions}
                />
                <div className={styles.buttonBox}>
                    <button className={styles.currencyConverterButton} onClick={convert}>Convert {form.toUpperCase()} to {to.toUpperCase()}</button>
                </div>
           </div>
        </div>
    );
}