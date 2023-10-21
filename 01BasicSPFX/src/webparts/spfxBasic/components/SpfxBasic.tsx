import * as React from 'react';
import {useState} from 'react';
import styles from './SpfxBasic.module.scss';
import type { ISpfxBasicProps } from './ISpfxBasicProps';

import Card from './Card/Card';

export default function SpfxBasic(props:ISpfxBasicProps)  {

   let [counter,setCounter] = useState(15);
   const {
      description     
    } = props;

    const addValue = () =>{
      if(counter < 20)
        setCounter(counter + 1);
    }

    const removeValue = () =>{
      if(counter >0)
        setCounter(counter - 1);
    }

    return (
      <div className={styles.main}>
        <h1>Hello World - HEllo - {description}</h1>
        <h1>Counter Application</h1>
        <h1>Current Counter - {counter}</h1>
        <div className={styles.buttonContainer}>
          <button className= {styles.buttonContainer_buttonCounter} onClick={addValue}>Add Value - {counter}</button>
           <button className= {styles.buttonContainer_buttonCounter} onClick={removeValue}>Remove Value - {counter}</button>
        </div>
        <Card />
      </div>
    );
  
}
