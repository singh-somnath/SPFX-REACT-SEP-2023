import * as React from 'react';
import {ComboBox, IComboBoxOption} from '@fluentui/react';
import { Controller } from 'react-hook-form';
import {useId}  from '@fluentui/react-hooks';
import styles from './ComboBoxComponent.module.scss'

interface IComboBoxType {
    control : any;
    name : string;
    label : string;
    optionsList : IComboBoxOption[];
    ariaInvalid : boolean;
    isRequired : boolean;
    keys : number[];
    ariaInvalidType : string | undefined;
    isMultiSelect : boolean;
}
const ComboBoxComponent = (props:IComboBoxType) =>{
    const {
        control,
        name,
        label,     
        optionsList,
        ariaInvalid,
        isRequired,
        isMultiSelect
    }=props;
    let { keys } = props;

    const id = useId();

    return(
        <div className={styles.ComboBoxContainer}>
            {label && <label htmlFor={id}>{label}</label>} 
            <Controller 
                control={control}
                name={name}
                rules={{required:isRequired}}
                render = {({field : {onChange}})=>(
                    <ComboBox 
                        options={optionsList}
                        multiSelect = {isMultiSelect}
                        selectedKey={keys}
                        onChange= {(_, option:IComboBoxOption) => {
                            if(isMultiSelect){
                                if(option.selected){
                                    if(keys)
                                        keys = [...keys,option.key as number];
                                    else
                                        keys = [option.key as number];                                   
                                }
                                else{
                                    keys = keys.filter((key:number) => key != option.key)
                                }
                                onChange(keys);
                            }
                            else{
                                keys = [option.key as number];  
                                onChange(option.key);
                            }
                        }}                       

                     />
                )}
            />
            {ariaInvalid && <div className={styles['ComboBoxContainer-error']}>{String(name).toUpperCase()} is required.</div>}
        </div>

    )

} 

export default ComboBoxComponent;