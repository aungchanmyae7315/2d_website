<template>
  <q-page>
    <q-infinite-scroll @load="loadMore" :offset="250">
    <q-pull-to-refresh @refresh="refresh">
    <q-list id="q-app" class="q-pa-md scroll my-list">
      
      <div @click="viewDetail(item);" v-for="item in purchases" :key="item.id" clickable>
        <div>
          <div class="q-pa-md">
              <div class="row bg-gray">
                <div class="col">
                  #{{item.id}}
                </div>
                <div class="col text-right">
                  {{daysHoursAgo(item.created_at)}}
                </div>
              </div>
              <div class="row">
                <div class="col">
                  {{item.dept_name}}
                </div>
                <div class="col text-right">
                  <q-icon name="far fa-user" />{{item.full_name}}
                </div>                
              </div>

              <div class="row" v-for="(item, index) in item.items" :key="item.id">
                <div class="col">
                  {{index+1}}.{{item.item_name}}
                </div>
              </div>

              <div v-for="mgr in item.mgrs" :key="mgr.id">
              <div class="row">
                <div class="col">
                  <q-icon name="far fa-user" />{{mgr.full_name}}
                </div>
                <div class="col text-right">
                  {{mgr.created_at}}
                </div>                
              </div>
              </div>
              <div class="row progress-bar">
                <div class="col bg-grey-3">
                  <div v-if="item.step == 0" class="bg-red-4" style="height:6px"></div>
                </div>
                <div class="col bg-grey-4">
                  <div v-if="item.step == 1" class="bg-red-4" style="height:6px"></div>                  
                </div>           
                <div class="col bg-grey-5">
                  <div v-if="item.step == 2" class="bg-red-4" style="height:6px"></div>
                </div>    
                <div class="col bg-grey-6">
                  <div v-if="item.step == 3" class="bg-red-4" style="height:6px"></div>
                </div>    
                <div class="col bg-grey-7">
                  <div v-if="item.step == 4" class="bg-red-4" style="height:6px"></div>
                </div>    
                <div class="col bg-grey-8">
                  <div v-if="item.step == 5" class="bg-red-4" style="height:6px"></div>
                </div>                                                                <div class="col bg-grey-9">
                  <div v-if="item.step == 6" class="bg-red-4" style="height:6px"></div>
                </div>                                                                         
              </div>
              <div class="row">
                <div class="col text-weight-bold">
                  <div v-if="item.step == 0">{{lang.pur_step_0}}</div>
                  <div v-if="item.step == 1">{{lang.pur_step_1}}</div>              <div v-if="item.step == 2">{{lang.pur_step_2}}</div>    
                  <div v-if="item.step == 3">{{lang.pur_step_3}}</div>              <div v-if="item.step == 4">{{lang.pur_step_4}}</div>              <div v-if="item.step == 5">{{lang.pur_step_5}}</div>        
                  <div v-if="item.step == 6">{{lang.pur_step_6}}</div>
                </div>
              </div>

            </div>
        </div>
      </div>
      
    </q-list>
    </q-pull-to-refresh>  
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="addPurchase" fab icon="add" color="accent" />
    </q-page-sticky>

  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import marked from 'marked';
import qs from 'qs';
import {Quasar,QPullToRefresh,date} from 'quasar';

export default {
  components:{
    QPullToRefresh
  },
  mounted() {    
    this.date = date;
    this.purchaseList(null);
    this.purchaseBadge();
    this.updateAppStatus({key:'isShowBottomTab',value:true});
    this.updateAppStatus({key:'enterModule',value:'purchase'});

    var type = this.$route.query.type;
    var pageTitle = '';
    if (type == "request_confirm"){
      pageTitle = this.lang.need_confirm;
    }
    else if (type == "processing"){
      pageTitle = this.lang.processing;
    }
    else if (type == "finished"){
      pageTitle = this.lang.close;
    }
    else if (type == "acceptance"){
      pageTitle = this.lang.acceptance;
    }
    else if (type == "me"){
      pageTitle = this.lang.me;
    }
    this.updateAppStatus({key:'pageTitle',value:pageTitle});

  },
  watch: {
    "$route.query.type": function (type) {
      //console.dir(id);
      //this.gooutList(type);
    },
  },
  computed: {
      ...mapGetters({
      purchases: 'core/getPurchases',
      appStatus: 'core/getAppStatus',
      lang: 'core/getLang'
    })
  },
  methods: {
    ...mapActions({
      updatePurchases: 'core/updatePurchases',
      refreshPurchases: 'core/refreshPurchases',
      updateAppStatus: 'core/updateAppStatus',
      updatePurchaseBadge: 'core/updatePurchaseBadge'
    }),
    daysHoursAgo(time){
      let now = new Date();
      let dateObj = new Date(time);
      let minutes = date.getDateDiff(now, dateObj, 'minutes');
      let hours = date.getDateDiff(now, dateObj, 'hours');
      let days = date.getDateDiff(now, dateObj, 'days');
      if (hours < 1){
        return minutes + ' ' +this.lang.minutes_ago;
      }
      else if (days < 1){
        return hours + ' ' +this.lang.hours_ago;
      }
      else{
        return days + ' ' +this.lang.days_ago;
      }
    },
    // updateLists(item){
    //   let index = this.lists.findIndex((list)=>{
    //     return list.id === item.id
    //   });
    //   //console.dir(index);
    //   this.$set(this.lists, index, item);
    // },
    viewDetail(item){
      console.dir(item);
      this.$router.push({
        name: 'purchaseDetail', 
        params: { item }
      });
    },
    refresh(done){
      console.dir(this.purchases[0]);
      this.$axios.get('/dev/purchase/list/?type='+this.purchasesParams.type+'&last_id='+this.purchases[0].id)  
      .then((response) => {
        if (response.data.success){
          this.refreshPurchases(response.data.data);
          if (done){
            done();
          }
        }
        else{
          this.$q.notify({ type: 'negative', message: response.data.message });
        }
      }).catch(error => {
        this.error(error);
      });
    },
    purchaseBadge(){
      this.$axios.get('/dev/purchase/statusNum/').then((response) => {
        console.dir(response.data);
        if (response.data.success){
          this.updatePurchaseBadge(response.data.data);
        }
        else{
          this.$q.notify({ type: 'negative', message: response.data.message });
        }
      }).catch(error => {
        //console.dir(error.response);
        if (error.response.status == 401){
          this.$router.push('/login');
        }
        //this.$q.notify({ type: 'negative', message: error.response.data.error });
      });
    },
    loadMore(index, done){
      console.dir(this.purchases.length);
      if (index == 1){
        var wait = 1000;
      }
      else{
        var wait = 10;
      }
      if (this.purchases.length >= 10){
        setTimeout(() => {
          if (index > 1){
            this.purchaseList(index, done);
          }
          else{
            done();
          }
        }, wait)
      }
      else{
        done(true);
      }

    },
    purchaseList(index, done){
      //console.dir("======done");
      //console.dir(done);
      if (this.appStatus.isViewDetail){
        //console.dir("isViewDetail");
        this.updateAppStatus({key:'isViewDetail',value:false});
        this.purchasesParams.page = this.appStatus.purchasePageNum;
        if (done){
          done(true);
        }        
        return;
      }

      this.purchasesParams.page = this.purchasesParams.page+1;
      if (this.$route.query && this.$route.query.type !== undefined){
        this.purchasesParams.type = this.$route.query.type;
      }

      // console.dir(this.purchasesParams);
      this.updateAppStatus({key:'purchaseQueryType', value:this.purchasesParams.type});
      this.$axios.get('/dev/purchase/list/?page='+this.purchasesParams.page+'&type='+this.purchasesParams.type)  
      .then((response) => {
        
        if (response.data.success){
          this.updateAppStatus({key:'purchasePageNum', value:this.purchasesParams.page});
          this.updatePurchases(response.data.data);
          // console.dir("-----------");
          // console.dir(response.data.data);
          if (done){
            console.dir("....done....");
            if (response.data.data.length < 10){
              done(true);
            }
            else{
              done();
            } 
          }
        }
        else{
          this.$q.notify({ type: 'negative', message: response.data.message });
        }
      }).catch(error => {
        this.error(error);
      });
    },
    error(error){
      console.dir(error);
      if (error.response.status == 401){
        this.$router.push('/login');
      }
      //this.$q.notify({ type: 'negative', message: error.response.data.error });
    },
    addPurchase(){
      this.$router.push({
        path: '/addPurchase'
      });
    }

  },
  data() {
    return {
      lists:[],
      item:[],
      isShow:false,
      purchasesParams:{type:'request_confirm', page:0}
    };
  },
};
</script>

<style lang="stylus" scoped>
.my-list .bg-gray
  background-color #c5c5c5
.my-list .col
  padding 5px
.my-list .row
  border-bottom 1px solid #c5c5c5
.my-list .progress-bar .col
  padding: 0 !important

.wrapper
  display flex
  min-height inherit
  width 100%
  .editor
    width 100%
    padding 1em
  .preview
    width 100%
    padding 1em
  button
    margin-top 3em
</style>
