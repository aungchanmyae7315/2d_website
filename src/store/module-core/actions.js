/*
export function someAction (context) {
}
*/
export const changeLang = (context, langName) => {
  context.commit('changeLang', langName);
}

export const updateAppStatus = (context, data) => {
  context.commit('updateAppStatus', data);
}

export const updateRepairBadge = (context, data) => {
  context.commit('updateRepairBadge', data);
}
export const updateRepairs = (context, repairs) => {
  context.commit('updateRepairs', repairs);
}
export const cleanRepairs = (context, repairs) => {
  context.commit('cleanRepairs', repairs);
}
export const refreshRepairs = (context, repairs) => {
  context.commit('refreshRepairs', repairs);
}

export const updatePurchaseBadge = (context, data) => {
  context.commit('updatePurchaseBadge', data);
}
export const updatePurchases = (context, purchases) => {
  context.commit('updatePurchases', purchases);
}
export const cleanPurchases = (context, purchases) => {
  context.commit('cleanPurchases', purchases);
}
export const refreshPurchases = (context, purchases) => {
  context.commit('refreshPurchases', purchases);
}

export const addCacheProduct = (context, data) => {
  context.commit('addCacheProduct', data);
}
export const deleteCacheProduct = (context, data) => {
  context.commit('deleteCacheProduct', data);
}