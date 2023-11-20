import * as React from 'react';
import { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { getBlogs   } from '../../shared/services/BlogService';
import { IBlogDetail } from '../../shared/interface/IBlogDetail';
import { Container,Button } from '../../shared/components';
import styles from './post.module.scss';
import parse from 'html-react-parser';

function Post(){
    const[post,setPost] = useState<IBlogDetail>();
    const[loader,setLoader] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(id)
             getBlogs(parseInt(id)).then((item:IBlogDetail)=>{
                setPost(item);
            }).catch(()=>{            
                    throw Error("Blog is not available.");                
            }).finally(()=>{
                setLoader(false);
            })
    },[])

    return(
        !loader? 
            (post ?
                <Container>
                        <div className={styles.postContainer}>
                            <div className={styles['postContainer-buttonContainer']}>
                                    <Button type="button"  onClickHandle={() => { navigate(`/editpost/${post?.Id}`)} }>Edit</Button>
                                    <Button type="button" >Delete</Button>
                            </div>
                            <div className={styles['postContainer-imageContainer']}>
                                <img className={styles['postContainer-imageContainer-image']} src={post?.File?.ServerRelativeUrl} alt="" />
                            </div>
                            <div className={styles['postContainer-details']}>
                                    <div className={styles['postContainer-details-title']}>Tittle : {post?.BlogTitle}</div>
                                    <div className={styles['postContainer-details-title']}>User : {post?.UserEmail}</div>
                            </div>
                            <div className={styles['postContainer-content']}>
                                Content : <br/>
                                {post?.BlogContent ? parse(post?.BlogContent) : null}
                            </div>

                        </div>
                </Container>
                :  
                <Container>
                    <div className={styles.postContainer}>
                       <h1> Item doest not exist. </h1>
                    </div>
                </Container>
            )
        :
        <Container>
                <h1>Loading...</h1>
        </Container>
    )
}

export default Post;