import React, { useEffect } from 'react'

import getConfig from 'next/config';
import axios from 'axios';

const { publicRuntimeConfig } = getConfig();

export default () => {
  useEffect(() => {
    console.log(123);
    axios.get('/api/user').then(res => {
  console.log(res);
    })
  }, [])
  return (
    <div>
      Index
     <a href={publicRuntimeConfig.OAUTH_URL}>登陆</a>
    </div>
  )
}

