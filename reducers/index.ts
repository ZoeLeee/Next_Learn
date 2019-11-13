import { combineReducers } from "redux";
import { UserReducer } from './userReducer';


export interface IInitState{
  userInfo:{[key:string]:any}
}


export const AllReduces = combineReducers({
  userInfo:UserReducer
});