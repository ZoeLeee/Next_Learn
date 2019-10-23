import { AllReduces } from "../reducers/TestReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { IInitState } from './../reducers/TestReducers';

export function initStore(initState:IInitState):Store{
  return createStore(AllReduces,Object.assign({},initState), composeWithDevTools(applyMiddleware(thunk)));
}
