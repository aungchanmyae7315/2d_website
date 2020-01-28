<template>
 <q-page class="q-ml-md q-mr-md">
   <q-resize-observer @resize="onResize" />
 


         <div class="main_container">
             <q-item clickable v-ripple>
                <q-item-section side>
                   <q-avatar @click="register_signup()">
                       <img src="../assets/images/icons/icon_my_profile.png">
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Please Login First</q-item-label>
                  <span class="me_amount">5000 MMK</span>

                
                </q-item-section>
              
              </q-item>
          

        </div>
   <div id="q-app">
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
        <q-carousel-slide :name="1"  img-src="../assets/images/slide_1.png" >
          <div class="absolute-bottom custom-caption">
            <div class="text-subtitle1">One Lorem ipsum dolor sit amet consectetur adipi</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" img-src="../assets/images/slide_1.png" >
           <div class="absolute-bottom custom-caption">
            <div class="text-subtitle1">Two Lorem ipsum dolor sit amet consectetur adipi</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" img-src="../assets/images/slide_1.png" >
           <div class="absolute-bottom custom-caption">
            <div class="text-subtitle1">Three Lorem ipsum dolor sit amet consectetur adipi</div>
          </div>
        </q-carousel-slide>
       
      </q-carousel>
    </div>
</div>
 

    <div class="row n_d_t">
      <div class="col">
          <div class="number">
                <h2>89</h2>
          </div>
      </div>
      <div class="col">
          <div class="date_time">
             <div class="d_t_item">
                <span>updated at:</span><br>
                <span>4 January 2020</span><br>
                <span>12:00 AM</span>
             </div>

             
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
    <div class="card_two">
        <div class="card_item">
          <h5 class="time_number">4:00 PM</h5>
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
                  <h4>--</h4>
              </div>
            </div>
        </div>
    </div>
     <div class="card_three">
        <div class="card_item">
         
            <div class="row">
              
              <div class="col">
                  <h5 class="time_number">4:00 PM</h5>
              </div>
              <div class="col">
                  <span>Set</span>
                  <h4>1596.89</h4>
              </div>
              <div class="col">
                  <span>Value</span>
                  <h4>1397.76</h4>
              </div>
            </div>
        </div>
    </div>
    <div class="card_three">
        <div class="card_item">
         
            <div class="row">
              
              <div class="col">
                  <h5 class="time_number">4:00 PM</h5>
              </div>
              <div class="col">
                  <span>Set</span>
                  <h4>1596.89</h4>
              </div>
              <div class="col">
                  <span>Value</span>
                  <h4>1397.76</h4>
              </div>
            </div>
        </div>
    </div>


     


    
    <div class="bet_btn">
        <q-btn class="glossy"  :to="{ path: 'bet/bet',query: {type: 'bet'}}" size="md" rounded label="Bet" ></q-btn>
    </div>





 
   <!-- <div class="row">
     
     <my-select v-model="selected" :options="myOptions" />
     <div @click="setPageTitle('Test set title');">Set title</div>
     <q-btn :label="lang.success" :no-caps="false" />
     <q-btn color="primary" size="sm" label="Editt" />
     <q-btn color="primary" size="sm" label="Profile" @click="profile();" />
     <q-btn color="primary" size="sm" label="Logout.." @click="logout();" />
     <q-btn color="primary" size="sm" label="UploadImage" @click="uploadImage();" />
     <q-btn color="primary" size="sm" label="Repair" @click="$router.push({ path: 'repair',query: {type: 'request_confirm'}});" />
     <div @click="testPageTitle();">aaaaa</div>

      <q-btn flat to='/login' v-if="!auth.loggedIn()">
        <q-icon name="input" />
        <q-tooltip>Log In</q-tooltip>
      </q-btn>
   </div> -->

    <!-- <div class="row">
      <div class="col">
        <q-select
          :options="[
            { label: 'English', value: 'en-us' },
            { label: 'Chinese', value: 'zh-hans' },
            { label: 'Myanmar', value: 'mm' },
          ]"
          :value="vlang"
          @input="onChangeLang"
          label="Language"
        >
        <template v-slot:prepend>
          <q-icon name="language" />
        </template>
        </q-select>
      </div>
      <div class="col q-mt-sm text-right">
        <q-btn outline rounded color="primary" no-caps label="Logout" @click="logout()" />
      </div>
    </div>
  <p>Hello</p>
    <q-card class="my-card q-mt-md">
      <q-item>
        <q-item-section avatar class="q-pa-md">
          <q-avatar size="90px">
            <img src="http://eslite.sites.com.mm/assets/imgs/user.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{user.full_name}} 
            <span v-if="user.is_manager == 1">({{lang.manager}})</span>
            <span v-if="user.is_manager == 0">({{lang.staff}})</span>
          </q-item-label>
          <q-item-label caption>{{user.dept_name}}</q-item-label>
          <q-item-label caption><q-icon name="fas fa-phone" />&nbsp;{{user.phone}}</q-item-label>
        </q-item-section>
      </q-item>

    </q-card>

    <q-card class="q-mt-md" @click="$router.push({ path: 'purchase',query: {type: 'request_confirm'}});">
      <div class="row text-center">
        <div class="col q-pa-md">
          <q-avatar size="100px">
            <q-icon style="color:#555555" class="fas fa-shopping-basket" />
          </q-avatar>
          <div class="text-h5" style="color:#555555" >{{lang.purchase}}</div>
        </div>
      </div>
      
    </q-card>


    <q-card class="q-mt-md" @click="$router.push({ path: 'repair',query: {type: 'request_confirm'}});">
      <div class="row text-center">
        <div class="col q-pa-md">
          <q-avatar size="100px">
            <q-icon style="color:#555555" class="fas fa-tools" />
          </q-avatar>
          <div class="text-h5" style="color:#555555">{{lang.repair}}</div>
        </div>
      </div>
      
    </q-card> -->


 </q-page>


</template>

<style>
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from "axios";
//import lang from '../i18n/en-us'
import auth from '../auth';
import { QSpinnerTail } from 'quasar';
import marked from 'marked';
import MySelect from '../components/MySelect'
export default {
  data: () => ({
    pageSize: {
      height: 0,
      width: 0
    },
    //lang,
    //lang:this.$i18n.locale,
    
    vlang: null,
    auth,
    posts: [],
    slide: 1,
    selected: null,
    myOptions: [ { label: 'BMW', value: 'car' }, { label: 'Samsung Phone', value: 'phone' } ]
    //onesignal
  }),
  components: { MySelect },
  // watch: {
  //   lang (lang) {
  //     if (lang.value){
  //       this.changeLang(lang.value);
  //     }

  //   }
  // },

  mounted() {
    //  axios
    //   .get('https://build.seinlucky.com/api/v1/twod-result/live')
    //   .then(response => (this.info = response))
    //   console.log(this.info);
    //   alert(this.info)
    // if (localStorage.getItem('Authorization') === null){
    //   this.$router.push('login');
    // }
    // this.updateAppStatus({key:'isShowBottomTab',value:false});
    // this.cleanRepairs([]);
    // this.cleanPurchases([]);
  },
  destroyed () {
    this.deletePageTitle()
  },
  computed: {
    /*
    ...mapGetters('example', [
      'getPageTitle'
    ])
    */
    ...mapGetters({
      getPageTitle: 'example/getPageTitle',
      user: 'login/user',
      lang: 'core/getLang'
    })
  },
  methods: {
    register_signup() {
      this.$router.push('login');
    },
    /*
    ...mapActions('example', [
      'setPageTitle',
      'deletePageTitle'
    ])
    */
    onChangeLang(v){
      //console.dir(v);
      this.changeLang(v.value);
    },
    ...mapActions({
      setPageTitle: 'example/setPageTitle',
      deletePageTitle: 'example/deletePageTitle',
      setIsLogin: 'login/setIsLogin',
      changeLang: 'core/changeLang',
      updateAppStatus: 'core/updateAppStatus',
      cleanRepairs: 'core/cleanRepairs',
      cleanPurchases: 'core/cleanPurchases',
    }),
    onResize (size) {
      this.pageSize = size
    },
 
    uploadImage(){
      window.imagePicker.hasReadPermission(
        function(result) {
          // if this is 'false' you probably want to call 'requestReadPermission' now
          //alert(result);
          if (result){
            //alert(result);
            realUploadImage();
          }
          else{
            window.imagePicker.requestReadPermission(
              function(result){
                realUploadImage();
              }
            );
          }
        }
      )

    },
    testPageTitle(){
      console.dir("testPageTitle...");
      console.dir(this.$store.getters);
      //console.dir(this.getPateTitle);
      //console.dir(state);
    },
    compile(raw) {
      return marked(raw, { sanitize: true });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    logout() {
      auth.logout();
      this.$q.notify({ type: 'info', message: 'You have been successfully logged out.' });
      this.setIsLogin(false);
      this.$router.push('login');
    },
    profile(){
      //console.dir(localStorage.getItem('Authorization'));
      this.$q.loading.show({ spinner: QSpinnerTail });
      this.$axios.get('/user/profile').then(res => {
        //this.posts = res.data;
        console.dir(res);
        this.$q.loading.hide();
      }).catch(error => {
        console.dir(error);
        this.$q.notify({ type: 'negative', message: error.response.data.error });
        this.$q.loading.hide();
      });
    },
  },

}
function realUploadImage(){
  window.imagePicker.getPictures(
    function(results) {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, 
    function (error) {
      console.log('Error: ' + error);
    }, 
    {
      maximumImagesCount: 10,
      width: 800,
      outputType:1
    }
  );
}
</script>


