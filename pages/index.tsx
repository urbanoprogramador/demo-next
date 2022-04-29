import React from 'react';
import type { NextPage } from 'next'

import { Provider } from 'react-redux';
import { rootReducer } from './../redux/store';
import { IndexApp } from '@/components/IndexApp';



const Home: NextPage = () => {

  return (
    <div role="body">
      <Provider store={rootReducer} >
        <IndexApp />
      </Provider>
    </div>
  )
}

export default Home;