import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { add, rename } from './../actions/test';
import { IInitState } from '../reducers/TestReducers';
import { IAppProps } from './_app';


const CC = ({ count,name, add,rename }) => {
  return (
    <div>
      <div>C组件{name}</div>
      <button onClick={() => add(count + 1)}>ADd {count}</button>
      <input type="text" onChange={e=>rename(e.target.value)} value={name} />
    </div>
  )
}

CC.getInitialProps=async ({reduxStore}:IAppProps)=>{
    reduxStore.dispatch(add(3))
    return {};
}

export default connect(
  function mapStatetoProps(state: IInitState) {
    return {
      count: state.count,
      name:state.name
    }
},
  function mapDispatchtoProps(dispath: Dispatch) {
    return {
      add: (n: number) => dispath(add(n)),
      rename:(s:string)=>dispath(rename(s)),
    }
  }
)(CC);
