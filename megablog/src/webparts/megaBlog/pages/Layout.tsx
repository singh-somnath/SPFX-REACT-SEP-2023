import * as React from 'react';
import {  HashRouter,Route,Routes } from 'react-router-dom';
import Home from './home/Home';
import AllPost from './allPost/AllPost';
import AuthLayout from '../shared/components/authLayout/AuthLayout';
import AddPost from './addPost/AddPost';
import EditPost from './editPost/EditPost';
import Login from './login/Login';
import SignUp from './signUp/SignUp';
import App from './app/App';
import Post from './post/Post';
//import ErrorBoundary from '../shared/components/errorBoundary/ErrorBoundary';
import ErrorComponent from '../shared//components/errorComponent/ErrorComponent';

function Layout() {
    return(          
            <HashRouter>
                <Routes>                
                    <Route path='/' element={<App />} errorElement={<ErrorComponent />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/allpost' element={<AuthLayout authentication><AllPost /></AuthLayout>} />
                        <Route path='/addpost' element={ <AuthLayout authentication><AddPost /></AuthLayout>} />
                        <Route path='/editpost/:id' element={<AuthLayout authentication><EditPost /></AuthLayout>} />
                        <Route path='/login' element={<AuthLayout authentication={false}><Login /></AuthLayout>} />
                        <Route path='/signup' element={<AuthLayout authentication={false}><SignUp /></AuthLayout>} />
                        <Route path='/post/:id' element={<AuthLayout authentication><Post /></AuthLayout>} />
                    </Route>   
                    <Route path='*' element={<div><h1>Not Found Page.</h1></div>}></Route>            
                </Routes>           
        </HashRouter>   
   
      
    );
}

export default Layout;
