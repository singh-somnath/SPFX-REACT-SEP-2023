import * as React from 'react';
import Container from '../container/Container';
import styles from './Header.module.scss';
import {Button, Logo} from '../index';
import { authService } from '../../services/AuthService';
import { useSelector } from 'react-redux';
import { IStateType } from '../../store/authSlice';
import {useNavigate} from 'react-router-dom';


const Header = () =>{
    const authStatus = useSelector((state:IStateType) => state.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name : "Home",
            url : "/",
            active : true
        },
        {
            name : "All Post",
            url : "/allPost",
            active : authStatus
        },
        {
            name : "Add Post",
            url : "/addpost",
            active : authStatus
        },
        {
            name : "Login",
            url : "/login",
            active : !authStatus
        },
        {
            name : "Sign Up",
            url : "/signup",
            active : !authStatus
        }
    ];

    const handleLogout = async() =>{
        const currentUser  = await authService.getCurrentUser();
        if(currentUser){
            const logOut = await authService.logOut(currentUser.UserEmail);
            console.log(logOut);
        }
            
    }

    return (
        <Container>
            <div className={styles.headerContainer}>            
                    <div className={styles.leftContainer}>
                            <Logo />
                    </div>
                    <div className={styles.rightContainer}>
                        {
                            navItems.map((item)=>(
                            item.active? <Button onClickHandle={() => navigate(item.url)}>{item.name}</Button> : null
                            ))
                        }
                        {
                            authStatus ? <Button onClickHandle={()=> handleLogout}>Logout</Button> : null
                        }

                    </div>
                    
            </div>
       </Container>
    )
}

export default Header;