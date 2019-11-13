import { AllReduces, IInitState } from "../reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";

export function initStore(initState:IInitState):Store{
  return createStore(AllReduces,Object.assign({},initState), composeWithDevTools(applyMiddleware(thunk)));
}
