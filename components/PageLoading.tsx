import { Spin } from "antd";

export default () =>
  <div className="loading">
    <Spin />
    <style jsx>{`
      .loading{
        position:fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        margin:auto;
        width:100%;
        height:100%;
        background:rgba(255,255,255,0.3);
        z-index:99;
        display:flex;
        align-items: center;
        justify-content: center;
      }
`}</style>
  </div>