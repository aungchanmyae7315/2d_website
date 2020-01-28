/*
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
]
*/
const routes = [
  { path: 'sign_up', component: () => import('pages/sign_up.vue') },
  {
    
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    
    children: [
      { path: 'home', component: () => import('pages/Index.vue') },
   
      { path: 'register', component: () => import('pages/Register.vue') },
      // { path: 'publish', component: () => import('pages/Publish.vue') },
      // { path: 'goout', component: () => import('pages/Goout.vue') },
      // { path: 'gooutDetail', component: () => import('pages/GooutDetail.vue') },

      //{ path: '/goout-list/:type', component: () => import('pages/GooutList.vue') , props: (route) => ({ name: route.params.type }) },
      //{ path: 'goout-list', component: () => import('pages/GooutList.vue') ,  props: route => Object.assign({}, route.params, route.query) },
      // { path: 'loginStep2', component: () => import('pages/loginStep2.vue') },
      { path: 'repair', component: () => import('pages/repair/Repair.vue') },
      { path: 'repairDetail', name: 'repairDetail', component: () => import('pages/repair/Detail.vue') },
      { path: 'addRepair', name: 'addRepair', component: () => import('pages/repair/AddRepair.vue') },
      { path: 'assignRepairJob', name: 'assignRepairJob', component: () => import('pages/repair/AssignRepairJob.vue') },
      { path: 'acceptRepairJob', name: 'acceptRepairJob', component: () => import('pages/repair/AcceptRepairJob.vue') },
      { path: 'responseJob', name: 'responseJob', component: () => import('pages/repair/ResponseJob.vue') },

      //{ path: 'purchase', component: () => import('pages/Purchase.vue') },
      { path: 'purchase', name: 'purchase', component: () => import('pages/purchase/Purchase.vue') },
      { path: 'purchaseDetail', name: 'purchaseDetail', component: () => import('pages/purchase/PurchaseDetail.vue') },
      { path: 'addPurchase', name: 'addPurchase', component: () => import('pages/purchase/AddPurchase.vue') },
      { path: 'addProduct', name: 'addProduct', component: () => import('pages/purchase/AddProduct.vue') },
      { path: 'assignPurchaseJob', name: 'assignPurchaseJob', component: () => import('pages/purchase/AssignPurchaseJob.vue') },
      { path: 'responsePurchaseJob', name: 'responsePurchaseJob', component: () => import('pages/purchase/ResponsePurchaseJob.vue') },
      { path: 'acceptance', name: 'acceptance', component: () => import('pages/purchase/Acceptance.vue') },
      { path: 'acceptanceForm', name: 'acceptanceForm', component: () => import('pages/purchase/AcceptanceForm.vue') },
      { path: 'deliveryDetail', name: 'deliveryDetail', component: () => import('pages/purchase/DeliveryDetail.vue') },
      { path: 'deliveryHistory', name: 'deliveryHistory', component: () => import('pages/purchase/DeliveryHistory.vue') },
    ],
  },
  { 
    path: '/about',
    component: () => import('layouts/AboutLayout.vue'),
    children: [
      { path: 'me', component: () => import('pages/account_me.vue') },
      { path: 'my_wallet', component: () => import('pages/my_wallet.vue') },
      { path: 'service', component: () => import('pages/service.vue') },
    ]
  },
  { 
    path: '/service',
    component: () => import('layouts/ServiceLayout.vue'),
    children: [
      { path: 'me', component: () => import('pages/account_me.vue') },
      { path: 'my_wallet', component: () => import('pages/my_wallet.vue') },
      { path: 'service', component: () => import('pages/service.vue') },
    ]
  },
  { 
    path: '/mywallet',
    component: () => import('layouts/MyWalletLayout.vue'),
    children: [
      { path: 'me', component: () => import('pages/account_me.vue') },
      { path: 'my_wallet', component: () => import('pages/my_wallet.vue') },
      { path: 'service', component: () => import('pages/service.vue') },
    ]
  },
  
  
  { 
    path: '/bet',
    component: () => import('layouts/BetLayout.vue'),
    children: [
      { path: 'bet', component: () => import('pages/bet.vue') },

    ]
  },
  { 
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/Login.vue') },

    ]
  },
  
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}


export default routes
