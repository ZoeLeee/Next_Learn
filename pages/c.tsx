import { connect } from 'react-redux';
// import { IInitState } from './_App';
import { Dispatch } from 'redux';
import { add, rename } from './../actions/test';


const CC = ({ count,name, add,rename }) => {
  return (
    <div>
      <div>C组件{name}</div>
      <button onClick={() => add(count + 1)}>ADd {count}</button>
      <input type="text" onChange={e=>rename(e.target.value)} value={name} />
    </div>
  )
}
// export default connect(
//   function mapStatetoProps(state: IInitState) {
//     return {
//       count: state.count,
//       name:state.name
//     }
// },
//   function mapDispatchtoProps(dispath: Dispatch) {
//     return {
//       add: (n: number) => dispath(add(n)),
//       rename:(s:string)=>dispath(rename(s)),
//     }
//   }
// )(CC);

export default  CC;