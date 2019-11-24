import React, { useEffect } from 'react'

import getConfig from 'next/config';
import Link from 'next/link';
import { Button } from 'antd';
import { req } from '../libs/Request';
import Koa  from 'koa';
import { IAppProps } from './../pages-test/_app';

const { publicRuntimeConfig } = getConfig();

const Index= () => {
  return (
    <div>
      Index
      <Link 
        href="/a/1"
      >
        <Button>ToA</Button>
      </Link>
    </div>
  )
}

export default Index;