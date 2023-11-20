import * as React from 'react';
import { Link, useRouteError} from 'react-router-dom';

export default function ErrorComponent(){

    const error:any = useRouteError();

    return(
        <div>
            <h1>Error : { error.message}</h1>
            <Link to={"/"}>Go to Home Page</Link>
        </div>
    )

}

