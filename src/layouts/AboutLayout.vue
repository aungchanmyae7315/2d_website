<template>
 <div id="q-app">
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
     
      <router-view :key="$route.fullPath" />
    
    </q-page-container>

    
    <q-footer>
    
    <!-- <q-btn @click="selectThirdTab">Select Third Tab</q-btn> -->
     <!-- <q-tabs v-if="appStatus.enterModule == 'repair'" v-model="selectedTab" align="center"> -->
    <q-tabs v-model="selectedTab" align="center">
      <q-route-tab no-caps :to="{ path: '/home'}" exact name="tab-1" icon="img:statics/icons_header/dimond_t_icon.png" label="Home">
        <!-- <q-badge color="red" floating>{{repairBadge.request_confirm_num}}</q-badge> -->
      </q-route-tab>
      <q-route-tab no-caps :to="{ path: '/mywallet/my_wallet'}" exact name="tab-2" icon="img:statics/icons_header/wallet_icon.png" label="My Wallet">
        <!-- <q-badge color="red" floating>{{repairBadge.processing_num}}</q-badge> -->
      </q-route-tab>
      <q-route-tab no-caps :to="{ path: '/service/service',query: {type: 'service'}}" exact name="tab-3" icon="img:statics/icons_service/service_icon.png" label="Service">
        <!-- <q-badge color="red" floating>{{repairBadge.finished_num}}</q-badge> -->
         <!-- <q-route-tab no-caps :to="{ path: '/service',query: {type: 'service'}}" exact name="tab-3" icon="fas fa-check-double" label="Service"> -->
      </q-route-tab>  
      <q-route-tab no-caps :to="{ path: '/about/me'}" exact name="tab-4" icon="img:statics/icons_header/me_t_icon.png" label="Me" />
    </q-tabs>


    </q-footer>

  </q-layout>
        </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import auth from '../auth';
import { openURL } from 'quasar'
//import gql from 'graphql-tag'

import { QTabs, QTab, QBtn } from 'quasar'
import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'center',
  timeout: 2000,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})
// import { colors } from 'quasar'
// colors.setBrand('light', '#DDD')
// colors.setBrand('primary', '#33F')
//colors.setBrand('primary', '#F33', document.getElementById('rebranded-section-id'))

// const authorQuery = gql`
//   query {
//     author {
//       id
//       name
//     }
//   }`

export default {
  name: 'AboutLayout',
  data() {
    return {
      auth,
      notiTitle:'',
      notiContent:'',
      selectedTab: 'tab-1',
      slide: 'first',
       tab: 'homes',
        tab: 'my_wallet',
        tab: 'services',
        tab: 'me',
    };
  },
  computed:{
    ...mapGetters({
      isLogin:'login/isLogin',
      user:'login/user',
      repairBadge:'core/getRepairBadge',
      purchaseBadge:'core/getPurchaseBadge',
      appStatus:'core/getAppStatus',
      lang: 'core/getLang'
    })
  },
  mounted() {
    //onesignal.init();
    const token = localStorage.getItem('Authorization');
    if (token) {
      //auth.authorize(token);
      //this.$store.dispatch('login/user');
      this.setUser();
      this.setIsLogin(true);
    }
  },
  methods: {
    ...mapActions({
      setUser: 'login/setUser',
      setIsLogin: 'login/setIsLogin',
      updateAppStatus: 'core/updateAppStatus'
    }),
    clickSlider(){
      //console.dir("aaaa");
      alert("aaa");
    },
    selectThirdTab () {
      // we select third tab which has `name` set to 'tab-3'
      this.selectedTab = 'tab-3'
    },
    home(){
      alert('hello');
      this.$router.push('home');
    },
    logout() {
      auth.logout();
      this.$q.notify({ type: 'info', message: 'You have been successfully logged out.' });
      this.setIsLogin(false);
      this.$router.push('login');

    },
    username() {
      return auth.getUser()
        ? auth.getUser().name
        : null;
    },
    openURL,
    fetchArticles (item) {
      this.$router.push('/author/' + item.id)
    }
  },

};
</script>

<style>

</style>
