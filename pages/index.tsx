import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { Button } from 'antd'
import Router from 'next/router';
export default  () => {
  return (
    <div>
      <header>
        <Link href="/a?id=1" as="/a/1">
          <Button>toA</Button>
        </Link>
        <Button onClick={() => {
          Router.push({
            pathname: "/b",
            query: { id: 2 }
          }, "/b/2")
        }}>toB</Button>
        {/* <Link href="/c">
          <Button>toC</Button>
        </Link> */}
      </header>
    </div>
  )
}

