import { Button } from "antd";
import { withRouter } from "next/router";
import styled from "styled-components";
import dynamic from 'next/dynamic'

const Com=dynamic(import("../components/Com"));

const Title = styled.h1`
    color:red
`
const B = ({ router, name, time }) =>
  <>
    <Button>B{router.query.id}{name}</Button>
    <Title>{time}</Title>
    <div>haha</div>
    <Com />
    <style jsx>{
      `
        div{
          color:blue
        }
      `
    }</style>
  </>

B.getInitialProps = async () => {
  let moment = (await import('moment'));
  return {
    name: "Zoe",
    time: moment.default(Date.now()).fromNow()
  }
}

export default withRouter(B);

