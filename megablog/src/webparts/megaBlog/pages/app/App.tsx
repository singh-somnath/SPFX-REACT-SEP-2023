import * as React from 'react';
import{Container, Footer, Header} from '../../shared/components/index';
import { Outlet } from 'react-router-dom';


function App() { 

    return(
       <Container>
            <Header/>
              <Outlet />
            <Footer />
       </Container>
    );
}

export default App;
