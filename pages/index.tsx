import React, { useEffect } from 'react'

import getConfig from 'next/config';
import Link from 'next/link';
import { Button } from 'antd';

const { publicRuntimeConfig } = getConfig();

export default () => {
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

