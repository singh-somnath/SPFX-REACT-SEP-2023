import * as React from 'react';
import Container from '../container/Container';
import styles from './Header.module.scss';
import {Button, Logo} from '../index';
import { authService } from '../../services/AuthService';
import { useSelector } from 'react-redux';
import { IStateType } from '../../store/authSlice';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logOut} from '../../store/authSlice';


const Header = () =>{
    const authStatus = useSelector((state:IStateType) => state.status);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const handleLogout = async(e:any) =>{
        e.preventDefault();
        const currentUserSession  = await authService.getCurrentUser();
        if(currentUserSession){
            const result = await authService.logOut(currentUserSession);
            if(result){
                dispatch(logOut());
            }
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
                            authStatus ? <Button onClickHandle={(e:any)=> {handleLogout(e)}}>Logout</Button> : null
                            
                        }

                    </div>
                    
            </div>
       </Container>
    )
}

export default Header;