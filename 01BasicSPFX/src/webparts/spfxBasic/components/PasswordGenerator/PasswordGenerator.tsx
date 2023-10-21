import * as React from 'react';
import {useState,useEffect, useRef, useCallback} from 'react';
import styles from './PasswordGenerator.module.scss';

export default function PasswordGenerator(props:any) {
    const [length,setLength] = useState(8);
    const [numbers,setNumbers] = useState(false);
    const [characters,setCharacters] = useState(false);
    const [password,setPassword] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    

    const passwordGenerator = useCallback( () =>{
        let _password = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if(numbers)  str += "1234567890";
        if(characters)  str += "~!@#$%^&*()_+";

        for(let i=1; i<= length; i++){
                const index = Math.floor((Math.random() * str.length));
                _password += str[index];
        }

        setPassword(_password);

    }, [length,characters,numbers]);

    const handleCopy = () =>{
        inputRef.current?.select();
        window.navigator.clipboard.writeText(password);
    }

    useEffect(
        ()=>{
                passwordGenerator();
    },[length,characters,numbers]);

    return(
        <div className={styles.main}>
           
            <div className={styles.container}>
                <h2>Password Generator</h2>
                <div className={styles.controlContainer}>
                    <input type="text" className={styles.textbox} value={password} readOnly ref={inputRef}/>
                    <button onClick={handleCopy} className={styles.copyButton}>Copy</button>
                </div> 
                <div className={styles.filterContainer}>
                    <div className="rangeBox">
                        <input type="range" className="rangeInput" min="0" max="100" value={length} onChange={(e) => setLength(parseInt(e.target.value))}/>
                        <label htmlFor="range" className="rangeLabel">Length {length}</label>
                    </div>
                    <div className="numberBox">
                        <input type="checkbox" className="checkboxNumber" checked={numbers} onChange={() => setNumbers((prev) => !prev)} />
                        <label htmlFor="checkboxNumber" className="checkboxNumberLabel">Numbers</label>
                    </div>
                    <div className="characterBox">
                        <input type="checkbox" className="checkboxCharacter" checked={characters} onChange={() => setCharacters((prev) => !prev)}/>
                        <label htmlFor="checkboxCharacter" className="checkboxCharacterLabel">Characters</label>
                    </div>
                </div>
            </div>
        </div>
    );
}