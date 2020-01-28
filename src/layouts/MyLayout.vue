<template>
 <div id="q-app">
  <q-layout view="lHh Lpr lFf">

    <q-layout-header >




      <q-header elevated>
          <q-toolbar>
           
              <q-btn flat to="/" class="bell">
                  <q-icon name="notifications" />
                  <q-tooltip>Bell</q-tooltip>
                </q-btn>
         
            <q-toolbar-title> <img src="~assets/images/logo.png" class="logo" alt="logo"></q-toolbar-title>
      <!-- autoplay music icon -->
            <q-btn flat round dense class="header_icon_one">
              <!-- <img src="~assets/images/icons/music_on.png" class="header_icon" alt="on"> -->
               <div class="wrapper">
                  <a href="#" title="Listen to the song" class="player-controls">
                      <span class="audio-label">
                          
                      </span>
                      <span class="play"></span>
                      <span class="pause"></span>
                  </a>
                  <audio id="player">
                      <source src="https://www.dropbox.com/s/t32waag3ib20b28/OneDance-Drake.mp3?raw=1" type="audio/mp3">
                       <!-- <source src="https://casting-crowns.mp3quack.com/?raw=1" type="audio/mp3"> -->
                  </audio>
              </div>
                
            </q-btn>
      <!-- autoplay music icon End -->
             <q-btn flat round dense>
                 <img src="~assets/images/icons/messeage_icon.png" class="header_icon" alt="mes">
            </q-btn>








          </q-toolbar>
        </q-header>

      </q-layout-header >



    <q-page-container>
     
      <router-view :key="$route.fullPath" />
    
    </q-page-container>

    
<!--
    <q-list
      no-border
      link
      inset-delimiter
    >
      <q-list-header>Author List {{user.staff_type}}</q-list-header>
      <q-item v-for="item in author" :key="item.id">
        <q-item-side icon="arrow_forward" />
        <q-item-main :label="item.name" @click.native="fetchArticles(item)" />
      </q-item>
    </q-list>
-->
    <!-- <q-footer>
      <q-tabs
          v-model="tab"
          class="bg text-white"
        >
          <q-tab name="home" icon="home" label="Homes" ></q-tab>
          <q-tab name="my_wallet" icon="~assets/images/icons/" label="My Wallet" ></q-tab>
          <q-tab name="services" icon="service" label="Service" ></q-tab>
          <q-tab name="~/assets/images/icons/account_circle.svg" icon="me" label="Me" ></q-tab>

        </q-tabs>
    </q-footer> -->
    
    <!-- <q-footer v-if="isLogin && appStatus.isShowBottomTab"> -->
    <q-footer>
    
    <!-- <q-btn @click="selectThirdTab">Select Third Tab</q-btn> -->
     <!-- <q-tabs v-if="appStatus.enterModule == 'repair'" v-model="selectedTab" align="center"> -->
    <q-tabs v-model="selectedTab" align="center">
      <q-route-tab no-caps :to="{ path: 'home',query: {type: 'home'}}" exact name="tab-1" icon="img:statics/icons_header/dimond_t_icon.png" label="Home">
        <!-- <q-badge color="red" floating>{{repairBadge.request_confirm_num}}</q-badge> -->
      </q-route-tab>
      <q-route-tab no-caps :to="{ path: '/mywallet/my_wallet'}" exact name="tab-2" icon="img:statics/icons_header/wallet_icon.png" label="My Wallet">
        <!-- <q-badge color="red" floating>{{repairBadge.processing_num}}</q-badge> -->
      </q-route-tab>
      <q-route-tab no-caps :to="{ path: '/service/service'}" exact name="tab-3" icon="img:statics/icons_header/service_icon.png" label="Service">
        <!-- <q-badge color="red" floating>{{repairBadge.finished_num}}</q-badge> -->
      </q-route-tab>  
      <q-route-tab no-caps :to="{ path: '/about/me'}" exact name="tab-4" icon="img:statics/icons_header/me_icon.png" label="Me" />
    </q-tabs>

    <!-- <q-tabs v-if="appStatus.enterModule == 'purchase' || appStatus.enterModule == 'acceptance'" v-model="selectedTab" align="center">
      
      <q-route-tab no-caps :to="{ path: 'purchase',query: {type: 'home'}}" exact name="tab-1" icon="fas fa-check" :label="lang.need_confirm">
        <q-badge color="red" floating>{{purchaseBadge.request_confirm_num}}</q-badge>
      </q-route-tab>
      <q-route-tab no-caps :to="{ path: 'purchase',query: {type: 'my_wallet'}}" exact name="tab-2" icon="fas fa-running" :label="lang.processing">
        <q-badge color="red" floating>{{purchaseBadge.processing_num}}</q-badge>
      </q-route-tab>
      <q-route-tab no-caps :to="{ path: 'acceptance',query: {type: 'service'}}" exact name="tab-3" icon="fas fa-running" :label="lang.acceptance">
        <q-badge color="red" floating>{{purchaseBadge.acceptance_num}}</q-badge>
      </q-route-tab>
      <q-route-tab no-caps :to="{ path: 'purchase',query: {type: 'finished'}}" exact name="tab-4" icon="fas fa-check-double" :label="lang.close">
        <q-badge color="red" floating>{{purchaseBadge.finished_num}}</q-badge>
      </q-route-tab>  
      <q-route-tab no-caps :to="{ path: 'purchase',query: {type: 'me'}}" exact name="tab-5" icon="fas fa-user" :label="lang.me" />


      
      <q-route-tab :to="{ path: 'purchase'}" exact name="tab-1" icon="far fa-plus-square" label="Purchase" />
      <q-route-tab :to="{ path: 'goout'}" exact name="tab-2" icon="far fa-plus-square" />
      <q-route-tab :to="{ path: 'goout-list', query: {type: 'new'}}" name="tab-3" icon="far fa-question-circle" exact />

      <q-route-tab :to="{ path: 'goout-list', query: {type: 'allow'}}" name="tab-4" icon="far fa-check-square" exact />

      <q-route-tab :to="{ path: 'goout-list', query: {type: 'all'}}" name="tab-5" icon="far fa-list-alt" exact />
     
    </q-tabs> -->

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
  name: 'MyLayout',
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
    // ...mapActions('login', [
    //   'user',
    //   'isLogin'
    // ]),

    // setUser(user){
    //   //this.user(user);
    //   console.dir(user);
    // },
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
  // apollo: {
  //   // Simple query that will update the 'author' vue property
  //   //author: authorQuery
  // }


};
</script>

<style>

</style>
