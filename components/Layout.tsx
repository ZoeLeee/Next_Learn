import { Avatar, Dropdown, Icon, Input, Layout, Menu } from 'antd';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import config from '../config';
import { loginOut } from './../actions/index';
import { IInitState } from './../reducers/index';
import { Container } from './Container';
import { withRouter } from 'next/router';

const { Header, Content, Footer } = Layout;

const IconStyle: React.CSSProperties = {
  fontSize: 30,
  marginRight: 10,
}


const MyLayout = ({ children, userInfo ,loginOut,router}) => {

  const handleLoginOut=useCallback(
    () => {
      loginOut();
    },[loginOut])

  const menu = (
    <Menu>
      <Menu.Item>
        <span onClick={handleLoginOut}>
          登出
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout >
      <Header>
        <div className="flex-between">
          <div className="logo flex">
            <Icon type="github" style={IconStyle} />
            <Input.Search placeholder="输入关键词" />
          </div>
          <div>
            {
              userInfo&&userInfo.id ?
                <Dropdown overlay={menu}>
                  <span>
                    <Avatar src={userInfo.avatar_url} style={{ cursor: "pointer" }} />
                  </span>
                </Dropdown>
                : <a href={`/prepare-auth?url=${router.asPath}`}>
                  <Avatar />
                </a>
            }
          </div>
        </div>
      </Header>
      <Content>
        <Container render={<div />}>
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

export default connect(
  function mapStateToProps(state: IInitState) {
    return {
      userInfo: state.userInfo
    }
  },
  function mapDispatchToProps(dispatch){
    return {
      loginOut:()=>dispatch(loginOut())
    }
  }
  )(withRouter(MyLayout));