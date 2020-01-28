<template>
 <div id="q-app">
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
     
      <router-view :key="$route.fullPath" />
    
    </q-page-container>

    
   

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
  name: 'BetLayout',
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
