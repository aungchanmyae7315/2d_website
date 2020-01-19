<template>
 <div id="q-app">
  <q-layout view="lHh Lpr lFf">
    <!--
    <q-layout-header  v-if='this.$route.path !== "/login" && this.$route.path !== "/loginStep2"'>-->
    <q-header v-if="isLogin">
      <q-toolbar color="primary">
        <q-btn flat to="/" v-if="this.$route.path.length <= 1">
          <q-icon name="home" />
          <q-tooltip>Home</q-tooltip>
        </q-btn>
        <img src="~assets/images/logo.png" class="logo" alt="logo">
        <q-btn flat @click="$router.go(-1)" v-if="this.$route.path.length > 1">
          <q-icon name="fas fa-arrow-left" />
          <q-tooltip>Back</q-tooltip>
        </q-btn>

        <q-toolbar-title class="text-subtitle1 text-center">
         
         {{appStatus.pageTitle}}

        </q-toolbar-title>
 
        <q-btn class="fixed" flat to='/login' v-if="!isLogin">
          <q-icon name="input" />
          <q-tooltip>Log In</q-tooltip>
        </q-btn>

        <q-btn flat to='/register' v-if="!isLogin">
          <q-icon name="person_add" />
          <q-tooltip>Sign Up</q-tooltip>
        </q-btn>

        <!-- <q-btn flat to='/login' v-if="isLogin" @click='logout()'>
          <q-icon name="fas fa-sign-out-alt" />
          <q-tooltip>Log Out</q-tooltip>
        </q-btn> -->
        <q-btn flat to='/home' v-if="isLogin">
          <q-icon name="fas fa-home" />
          <q-tooltip>Home</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>
    
    <q-page-container>
      <router-view :key="$route.fullPath" />
        <div class="main_container">
             <q-item clickable v-ripple>
                <q-item-section side>
                   <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar.png">
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Please Login First</q-item-label>
                
                </q-item-section>
              
              </q-item>
          

        </div>
   
  <div class="q-pa-md">
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        autoplay
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <q-carousel-slide name="first" img-src="~assets/images/slide_1.png">
          <div class="absolute-bottom custom-caption">
            
            <div class="text-subtitle1">Lorem ipsum dolor sit amet consectetur adipi</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="second" img-src="~assets/images/slide_1.png">
          <div class="absolute-bottom custom-caption">
           
            <div class="text-subtitle1">Famous Lorem ipsum dolor sit amet consectetur</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="third" img-src="~assets/images/slide_1.png">
          <div class="absolute-bottom custom-caption">
           
            <div class="text-subtitle1">Famous Lorem ipsum dolor sit amet consectetur</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>


       
<!--         
        <div class="q-pa-md">
            <q-carousel
              animated
              v-model="slide"
              height ="130px"
              navigation
              infinite
             
              transition-prev="slide-right"
              transition-next="slide-left"
            >
              <q-carousel-slide name="first" img-src="~assets/images/slide_1.png">
                <div class="absolute-bottom custom-caption">
                
                  <div class="text-subtitle1">Mountains</div>
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="second" img-src="~assets/images/slide_1.png">
                <div class="absolute-bottom custom-caption">
                 
                  <div class="text-subtitle1">Mountains</div>
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="third" img-src="~assets/images/slide_1.png">
                <div class="absolute-bottom custom-caption">
               
                  <div class="text-subtitle1">Mountains</div>
                </div>
              </q-carousel-slide>
          
            </q-carousel>
          </div>
   -->


    <div class="row n_d_t">
      <div class="col">
          <div class="number">
                <h2>89</h2>
          </div>
      </div>
      <div class="col">
          <div class="date_time">
              <ul>
                <li>updated at:</li>
                <li>4 January 2020</li>
                <li>12:00 AM</li>
              </ul>
          </div>
      </div>
    </div>
    <div class="card_one">
        <div class="card_item">
          <h5 class="time_number">12:00 AM</h5>
            <div class="row">
              
              <div class="col">
                  <span>Set</span>
                  <h4>1596.89</h4>
              </div>
              <div class="col">
                  <span>Value</span>
                  <h4>1397.76</h4>
              </div>
              <div class="col">
                  <span>2D</span>
                  <h4>89</h4>
              </div>
            </div>
        </div>
    </div>


















      
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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

    <q-footer v-if="isLogin && appStatus.isShowBottomTab">
    <!--<q-btn @click="selectThirdTab">Select Third Tab</q-btn>-->
    <q-tabs v-if="appStatus.enterModule == 'repair'" v-model="selectedTab" align="center">
      <q-route-tab no-caps :to="{ path: 'repair',query: {type: 'request_confirm'}}" exact name="tab-1" icon="fas fa-check" :label="lang.need_confirm">
        <q-badge color="red" floating>{{repairBadge.request_confirm_num}}</q-badge>
      </q-route-tab>
      <q-route-tab no-caps :to="{ path: 'repair',query: {type: 'processing'}}" exact name="tab-2" icon="fas fa-running" :label="lang.processing">
        <q-badge color="red" floating>{{repairBadge.processing_num}}</q-badge>
      </q-route-tab>
      <q-route-tab no-caps :to="{ path: 'repair',query: {type: 'finished'}}" exact name="tab-3" icon="fas fa-check-double" :label="lang.close">
        <q-badge color="red" floating>{{repairBadge.finished_num}}</q-badge>
      </q-route-tab>  
      <q-route-tab no-caps :to="{ path: 'repair',query: {type: 'me'}}" exact name="tab-4" icon="fas fa-user" :label="lang.me" />
    </q-tabs>

    <q-tabs v-if="appStatus.enterModule == 'purchase' || appStatus.enterModule == 'acceptance'" v-model="selectedTab" align="center">
      <q-route-tab no-caps :to="{ path: 'purchase',query: {type: 'request_confirm'}}" exact name="tab-1" icon="fas fa-check" :label="lang.need_confirm">
        <q-badge color="red" floating>{{purchaseBadge.request_confirm_num}}</q-badge>
      </q-route-tab>
      <q-route-tab no-caps :to="{ path: 'purchase',query: {type: 'processing'}}" exact name="tab-2" icon="fas fa-running" :label="lang.processing">
        <q-badge color="red" floating>{{purchaseBadge.processing_num}}</q-badge>
      </q-route-tab>
      <q-route-tab no-caps :to="{ path: 'acceptance',query: {type: 'acceptance'}}" exact name="tab-3" icon="fas fa-running" :label="lang.acceptance">
        <q-badge color="red" floating>{{purchaseBadge.acceptance_num}}</q-badge>
      </q-route-tab>
      <q-route-tab no-caps :to="{ path: 'purchase',query: {type: 'finished'}}" exact name="tab-4" icon="fas fa-check-double" :label="lang.close">
        <q-badge color="red" floating>{{purchaseBadge.finished_num}}</q-badge>
      </q-route-tab>  
      <q-route-tab no-caps :to="{ path: 'purchase',query: {type: 'me'}}" exact name="tab-5" icon="fas fa-user" :label="lang.me" />


      <!--
      <q-route-tab :to="{ path: 'purchase'}" exact name="tab-1" icon="far fa-plus-square" label="Purchase" />
      <q-route-tab :to="{ path: 'goout'}" exact name="tab-2" icon="far fa-plus-square" />
      <q-route-tab :to="{ path: 'goout-list', query: {type: 'new'}}" name="tab-3" icon="far fa-question-circle" exact />

      <q-route-tab :to="{ path: 'goout-list', query: {type: 'allow'}}" name="tab-4" icon="far fa-check-square" exact />

      <q-route-tab :to="{ path: 'goout-list', query: {type: 'all'}}" name="tab-5" icon="far fa-list-alt" exact />
      -->
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
  name: 'MyLayout',
  data() {
    return {
      auth,
      notiTitle:'',
      notiContent:'',
      selectedTab: 'tab-1',
      slide: 'first'
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
