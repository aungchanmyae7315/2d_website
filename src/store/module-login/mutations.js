/*
export function someMutation (state) {
}
*/
export const setLoginPhone = (state, loginPhone) => {
  //console.log('MUTATION SET TITLE: ' + newPageTitle)
  state.loginPhone = loginPhone
 }
 export const setIsLogin = (state, isLogin) => {
  //console.log('MUTATION SET TITLE: ' + newPageTitle)
  state.isLogin = isLogin
 } 
 export const setUser = (state) => {
  //console.log('MUTATION SET TITLE: ' + newPageTitle)
  state.user = JSON.parse(localStorage.getItem('user'))
 } 
 export const deleteLoginPhone = (state) => {
  //console.log('MUTATION DELETE TITLE')
  state.loginPhone = ''
 }
