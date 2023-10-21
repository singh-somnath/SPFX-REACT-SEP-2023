import * as React from 'react';
import {useState} from 'react';
import styles from './BackgroundChanger.module.scss';


export default function BackgroundChanger(props:any) {
    const[color,setColor] = useState("Green");

    const handleClick = (colorName:any) =>{
        setColor(colorName);
    }

    return (
        <div className={styles.main} style={{backgroundColor:color}}>            
            <div className={styles.bottomBtnContainer}>
                <button className={styles.buttonControl} style={{backgroundColor:'Green'}} onClick={() => handleClick('Green')}>Green</button>
                <button className={styles.buttonControl} style={{backgroundColor:'Blue'}} onClick={() => handleClick('Blue')}>Blue</button>
                <button className={styles.buttonControl} style={{backgroundColor:'pink'}} onClick={() => handleClick('Pink')}> Pink</button>
                <button className={styles.buttonControl} style={{backgroundColor:'orange'}} onClick={() => handleClick('Orange')}>Orange</button>
                <button className={styles.buttonControl} style={{backgroundColor:'yellow'}} onClick={() => handleClick('Yellow')}>Yellow</button>
                <button className={styles.buttonControl} style={{backgroundColor:'Greenyellow'}} onClick={() => handleClick('Greenyellow')}>Greenyellow</button>
                <button className={styles.buttonControl} style={{backgroundColor:'Baize'}} onClick={() => handleClick('Baize')}> Baize</button>
                <button className={styles.buttonControl} style={{backgroundColor:'Black', color:'white'}} onClick={() => handleClick('Black')}>Black</button>
                <button className={styles.buttonControl} style={{backgroundColor:'White'}} onClick={() => handleClick('White')}>White</button>
            </div>
        </div>
    );
}