import  React  from 'react';

const style={
  width:"100%",
  maxWidth:1280,
  margin:"0 auto"
}

interface IContainer{
  children:JSX.Element;
  render:JSX.Element;
}

export const Container = ({ children,render}:IContainer) => {
  return React.cloneElement(render,{
    style:{...style,...render.props.style},
    children
  })
}