import React from 'react'
import { Button } from 'antd'
import Link from 'next/link';
import Router from 'next/router';

export default ({ children }) => {
  return (
    <>
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
      </header>
      {children}
    </>
  )
}