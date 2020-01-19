/*
export function someAction (context) {
}
*/
export const setPageTitle = (context, newPageTitle) => {
  console.log('ACTION SET TITLE: ' + newPageTitle)
  context.commit('setPageTitle', newPageTitle)
 }
 
export const deletePageTitle = (context) => {
  console.log('ACTION DELETE TITLE')
  context.commit('deletePageTitle')
}
