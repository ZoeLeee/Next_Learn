import { combineReducers } from "redux";

export function add(state={count:0},action){
  switch (action.type){
    case "ADD":
      return {
        count:action.count
      }
    default:
      return state;
  }
}


export function rename(state={name:"Zoe"},action){
  switch (action.type){
    case "RENAME":
      return {
        ...state,
        count:action.name
      }
    default:
      return state;
  }
}


export const AllReduces= combineReducers({
  add,rename
});