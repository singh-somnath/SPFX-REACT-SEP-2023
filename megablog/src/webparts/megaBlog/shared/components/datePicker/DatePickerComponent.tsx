import * as React from 'react';
import {
  DatePicker,
  DayOfWeek, 
  defaultDatePickerStrings,
} from '@fluentui/react';
import { Controller } from 'react-hook-form';
import styles from './DatePickerComponent.module.scss';

const  DatePickerComponent = (props:any) => {

  const {
   name,
   control,
   ariaInvalid,
   isRequired,
   label,
   defaultValue
 } = props;

  return (
    <div className={styles.DatePickerContainer}>
      {label && <label>{label}</label>}
      <Controller 
        control={control}
        name={name}
        rules={{required:isRequired}}
        render={({field:{onChange}})=>(
          <DatePicker
              firstDayOfWeek={DayOfWeek.Sunday}
              placeholder="Select a date..."
              ariaLabel="Select a date"
              strings={defaultDatePickerStrings}
              onSelectDate={onChange}
              value={defaultValue}                            
            />   
        )}
      />
      {ariaInvalid && <div className={styles['DatePickerContainer-error']}>{String(name).toUpperCase} is required</div>}  
      
    </div>
  );
};

export default DatePickerComponent;
