/*
export function someMutation (state) {
}
*/
export const setPageTitle = (state, newPageTitle) => {
  console.log('MUTATION SET TITLE: ' + newPageTitle)
  state.currentPageTitle = newPageTitle
 }
 
 export const deletePageTitle = (state) => {
  console.log('MUTATION DELETE TITLE')
  state.currentPageTitle = ''
 }
