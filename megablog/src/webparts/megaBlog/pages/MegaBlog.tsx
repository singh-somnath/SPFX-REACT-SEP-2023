import * as React from 'react';
//import styles from './MegaBlog.module.scss';
import type { IMegaBlogProps } from './IMegaBlogProps';
import {Provider} from 'react-redux';
import store from '../shared/store/Store';
import Layout from './Layout';


export default function MegaBlog (props:IMegaBlogProps) {
  const {  context } = props;
  console.log(context);
  return(
    <Provider store={store}>
      <Layout />
    </Provider>
  )
}

