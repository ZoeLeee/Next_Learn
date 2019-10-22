import { combineReducers } from "redux";

export function add(state = 0, action): number {
  switch (action.type) {
    case "ADD":
      return action.count;
    default:
      return state;
  }
}


export function rename(state = "Zoe", action): string {
  switch (action.type) {
    case "RENAME":
      return action.name
    default:
      return state;
  }
}


export const AllReduces = combineReducers({
  count: add, name: rename
});