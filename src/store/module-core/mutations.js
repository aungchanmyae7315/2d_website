/*
export function someMutation (state) {
}
*/

export const changeLang = (state, langName) =>{
  import(`../../i18n/${langName}`).then(language => {
    console.dir(language.default);
    state.lang = language.default
  })  
} 
export const updateAppStatus = (state, data) =>{
  state.appStatus[data.key] = data.value;
}

export const refreshRepairs = (state, repairs) => {  
  repairs.forEach(function(item){
      state.repairs.unshift(item);
  });
}
export const cleanRepairs = (state, repairs) => {  
  state.repairs = repairs;
}
export const updateRepairs = (state, repairs) => {  
  if (state.repairs.length > 0 && (state.appStatus.lastRepairQueryType == state.appStatus.repairQueryType)){
    repairs.forEach(function(item){
      state.repairs.push(item);
    });
  }
  else{
    state.repairs = repairs;
  }
  state.appStatus.lastRepairQueryType = state.appStatus.repairQueryType;
}
export const updateRepairBadge = (state, data) =>{
  state.repairBadge = data;
}


export const refreshPurchases = (state, purchases) => {  
  purchases.forEach(function(item){
      state.purchases.unshift(item);
  });
}
export const cleanPurchases = (state, purchases) => {  
  state.purchases = purchases;
}

// export const updatePurchases = (state, purchases) => {  
//   if (state.purchases.length > 0 && !state.isRefreshList){
//     purchases.forEach(function(item){
//       state.purchases.push(item);
//     });
//   }
//   else{
//     state.purchases = purchases;
//   }
// }

export const updatePurchases = (state, purchases) => {  
  if (state.purchases.length > 0 && (state.appStatus.lastPurchaseQueryType == state.appStatus.purchaseQueryType)){
    purchases.forEach(function(item){
      state.purchases.push(item);
    });
  }
  else{
    state.purchases = purchases;
  }
  state.appStatus.lastPurchaseQueryType = state.appStatus.purchaseQueryType;
}

export const updatePurchaseBadge = (state, data) =>{
  state.purchaseBadge = data;
}
export const addCacheProduct = (state, data) =>{
  if (data.k === undefined){
    state.products.push(data);
  }
  else{
    state.products.forEach(function(p, k){
      if (data.k == k){
        state.products[k] = data;
      }
    });
  }

}
export const deleteCacheProduct = (state, data) =>{
  if (data.k !== undefined){
    state.products.splice(data.k, 1);
  }
}