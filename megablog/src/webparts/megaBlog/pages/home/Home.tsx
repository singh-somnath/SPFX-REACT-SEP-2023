import * as React from 'react';
import{Container} from '../../shared/components/index';
import { useSelector } from 'react-redux';
import { IStateType } from '../../shared/store/authSlice';
import AllPost from '../allPost/AllPost';

function Home() {
    const authStatus = useSelector((state:IStateType) => state.status);

    return(
       <Container>
            {!authStatus ?  <>Please Login to check the blogs.</> : <AllPost/>}
       </Container>
    );
}

export default Home;
