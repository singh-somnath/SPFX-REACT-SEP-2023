export interface IInputBoxProps {
    label:string;
    className : string;
    amount:number;
    currencyOptions : string[] ;
    onAmountChange:Function;
    onCurrencyChange:Function;
    selectCurrency:string;
}