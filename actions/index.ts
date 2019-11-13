import Axios from "axios";

export const LOGIN_OUT = "login-out";

export function loginOutAction() {
  return {
    type: LOGIN_OUT
  }
}

export function loginOut():any {
  return dispatch =>
    Axios.post('/loginOut')
      .then(res => {
        if (res.status === 200) {
          dispatch(loginOutAction())
        }
        else {
          console.error(res);
        }
      })
}