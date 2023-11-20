import * as React from 'react';
//import styles from './MegaBlog.module.scss';
import type { IMegaBlogProps } from './IMegaBlogProps';
import {Provider} from 'react-redux';
import store from '../shared/store/Store';
import Layout from './Layout';
import ErrorBoundary from '../shared/components/errorBoundary/ErrorBoundary';



export default function MegaBlog (props:IMegaBlogProps) {
  const {  context } = props;
  console.log(context);
  return(
    <ErrorBoundary fallback={<div><h1>Error</h1></div>}>
      <Provider store={store}>
        <Layout />
      </Provider>
    </ErrorBoundary>
  )
}

