/*
export function someGetter (state) {
}
*/
export const getLoginPhone = (state) => {
  //console.log('GET TITLE: ' + state.currentPageTitle)
  return state.loginPhone
}
export const isLogin = (state) => {
  //console.log('GET TITLE: ' + state.currentPageTitle)
  return state.isLogin
}
export const user = (state) => {
  //console.log('GET TITLE: ' + state.currentPageTitle)
  return state.user
}