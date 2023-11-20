import * as React from 'react';
import {useEffect, useState} from 'react';
import { Container, PostForm  } from '../../shared/components';
import { useParams } from 'react-router-dom';
import { getBlogs } from '../../shared/services/BlogService'; 
import { IBlogDetail } from '../../shared/interface/IBlogDetail';

function EditPost(){
    const[post,setPost] = useState<IBlogDetail>();
    const[loader,setLoader] = useState(true);
    const { id } = useParams();
    
    useEffect(()=>{

         getBlogs(Number(id))
         .then((item:IBlogDetail)=>{
            setPost(item);
         }).finally(()=>{
            setLoader(false);
         });

    },[])

    return(
        loader ? <Container> <h1>Loading...</h1></Container> :
        <Container>
             <PostForm post={post}/>
        </Container>
    )
}

export default EditPost;