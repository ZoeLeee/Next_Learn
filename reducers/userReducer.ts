import { Action } from "redux";
import Axios from "axios";
import { loginOutAction } from "../actions";
import { LOGIN_OUT } from './../actions/index';



export function UserReducer(state = {}, action: Action) {
  switch (action.type) {
    case LOGIN_OUT:
      return {};
    default:
      return state;
  }
}