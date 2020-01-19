/*
export function someGetter (state) {
}
*/
export const getLang = (state) => {
  return state.lang
} 
export const getAppStatus = (state) => {
  return state.appStatus
} 

export const getRepairs = (state) => {
  return state.repairs
} 
export const getRepairBadge = (state) => {
  return state.repairBadge
} 

export const getPurchases = (state) => {
  return state.purchases
} 
export const getPurchaseBadge = (state) => {
  return state.purchaseBadge
} 
export const getCacheProduct = (state) => {
  return state.products
} 