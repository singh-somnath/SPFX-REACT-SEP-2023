import * as React from 'react';
import {Component} from 'react';

interface IErrorBoundaryProps{  
    children : React.ReactNode;
    fallback : React.ReactElement
}
interface IErrorBoundaryState{  
    hasError: boolean;
}

export default class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState>
{

    constructor(props : IErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error:any){
        console.log(error);
        return{hasError:true}
    }

    

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log(error,errorInfo);
    }

    render(){
        if(this.state.hasError)
        {
            return this.props.fallback;
        }

        return this.props.children;
    }

}