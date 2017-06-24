/**
 * Created by vincent on 2017/5/17.
 */

export default class {
  constructor () {
    let session = localStorage
    // console.log(session)
    this.username = session.username
    this.token = session.token
  }
  checkToken () {
    return this.token
  }
  setToken (tk) {
    localStorage.setItem('token', tk)
  }
  clearToken () {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}
