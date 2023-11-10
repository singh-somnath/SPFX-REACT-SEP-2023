import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './PostCard.module.scss';

function PostCard(props:any) {
    const {id,title,featureImage} = props;
    return(
        <Link className={styles.dataCardContainer} to={`/post/${id}`}>
            <div className={styles.dataCard}>
                 <div className={styles['dataCard-imageContainer']}>
                    <img className={styles['dataCard-imageContainer-image']} alt='' src={featureImage} />
                 </div>
                 <div className=''>
                    {title}
                 </div>

            </div>
        </Link>
    )
}

export default PostCard;