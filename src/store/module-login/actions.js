/*
export function someAction (context) {
}
*/
export const setLoginPhone = (context, loginPhone) => {
  //console.log('ACTION SET TITLE: ' + newPageTitle)
  context.commit('setLoginPhone', loginPhone)
 }
 export const setIsLogin = (context, isLogin) => {
  //console.log('ACTION SET TITLE: ' + newPageTitle)
  context.commit('setIsLogin', isLogin)
 } 
 export const setUser = (context, user) => {
  //console.log('ACTION SET TITLE: ' + newPageTitle)
  context.commit('setUser', user)
 }  
export const deleteLoginPhone = (context) => {
  //console.log('ACTION DELETE TITLE')
  context.commit('deleteLoginPhone')
}
