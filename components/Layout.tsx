import React from 'react'
import { Button, Icon, Input, Avatar } from 'antd'
import Link from 'next/link';
import Router from 'next/router';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Container } from './Container';

const { Header, Content, Footer } = Layout;

const IconStyle: React.CSSProperties = {
  fontSize: 30,
  marginRight: 10,
}


export default ({ children }) => {
  return (
    <Layout >
      <Header>
        <div className="flex-between">
          <div className="logo flex">
            <Icon type="github" style={IconStyle} />
            <Input.Search placeholder="输入关键词" />
          </div>
          <div>
            <Avatar />
          </div>
        </div>
      </Header>
      <Content>
        <Container>
          {children}
        </Container>
      </Content>
      <Footer>
        design by Joe
      </Footer>
      <style jsx>{`
        .logo{
          color:#fff;
          align-items: center;
        }
      `}</style>
      <style global jsx>{`
        #__next{
          height:100%;
        }
        .ant-layout{
          height:100%;
        }
      `}</style>
    </Layout>
  )
}