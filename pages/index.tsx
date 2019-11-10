import React, { useEffect } from 'react'

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default () => {
  return (
    <div>
      Index
    </div>
  )
}

