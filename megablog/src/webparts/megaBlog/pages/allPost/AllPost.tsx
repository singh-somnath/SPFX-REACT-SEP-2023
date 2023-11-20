import * as React from 'react';
import { Container, PostCard } from '../../shared/components';
import { useState, useEffect } from 'react';
import { getBlogs } from '../../shared/services/BlogService';
import { IBlogDetail } from '../../shared/interface/IBlogDetail';
import styles from './AllPost.module.scss';

function AllPost(){
    const [posts,SetPosts] = useState<IBlogDetail[]>([]);

     useEffect(()=>{
            getBlogs().then((items:IBlogDetail[]) =>{
                SetPosts(items);
            }).catch(()=>{
                throw new Error("Blogs not able to found.");
            })
    },[])

    return(
        <Container>
             <div className={styles.allPostContainer}>
                {
                    posts.map((post:IBlogDetail)=>(
                       <PostCard id={post.Id} featureImage={post.File?.ServerRelativeUrl} title={post.BlogTitle} />
                    ))
                }

             </div>
        </Container>
    )
}

export default AllPost;