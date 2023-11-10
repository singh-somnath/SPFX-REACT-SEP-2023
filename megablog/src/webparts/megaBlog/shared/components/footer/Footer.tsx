import * as React from 'react';
import Container from '../container/Container';
import styles from './Footer.module.scss';
import {Logo} from '../index';
import { Link } from 'react-router-dom';

const Footer = () =>{

    return (
        <Container>
               <div className={styles.footerContainer}>            
                    <div className={styles.leftContainer}>
                            <Logo />
                    </div>
                    <div className={styles.rightContainer}>
                       <div className="">
                         <div className={styles.linkButton}> <Link to="/">Product</Link></div>
                         <div className={styles.linkButton}> <Link to="/">Product</Link></div>
                         <div className={styles.linkButton}> <Link to="/">Product</Link></div>
                         <div className={styles.linkButton}> <Link to="/">Product</Link></div>                           
                       </div>
                       <div className="">
                           <div className={styles.linkButton}> <Link to="/">Product</Link></div>
                           <div className={styles.linkButton}> <Link to="/">Product</Link></div>
                           <div className={styles.linkButton}> <Link to="/">Product</Link></div>
                       </div>
                       <div className="">
                           <div className={styles.linkButton}> <Link to="/">Product</Link></div>
                           <div className={styles.linkButton}> <Link to="/">Product</Link></div>
                           <div className={styles.linkButton}> <Link to="/">Product</Link></div>
                       </div>


                    </div>
                    
            </div>
       </Container>
    )
}

export default Footer;