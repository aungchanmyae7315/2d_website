<template>
  <q-page>
    <q-infinite-scroll @load="loadMore" :offset="250">
    <q-pull-to-refresh @refresh="refresh">
    <q-list id="q-app" class="q-pa-md scroll my-list">
      
      <div @click="viewDetail(item);" v-for="item in repairs" :key="item.id" clickable>
        <div>
          <div class="q-pa-md">
              <div class="row bg-gray">
                <div class="col">
                  #{{item.id}} ({{item.location_name}})
                </div>
                <div class="col text-right">
                  {{daysHoursAgo(item.created_at)}}
                </div>
              </div>
          
              <div class="row">
                <div class="col">
                  {{item.equip_name}} ({{item.model}})
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

              <div class="row">
                <div class="col">
                  <div v-if="item.step == 0">{{lang.rep_step_0}}</div>
                  <div v-if="item.step == 1">{{lang.rep_step_1}}</div>              <div v-if="item.step == 2">{{lang.rep_step_2}}</div>    
                  <div v-if="item.step == 3">{{lang.rep_step_3}}</div>              <div v-if="item.step == 4">{{lang.rep_step_4}}</div>              <div v-if="item.step == 5">{{lang.rep_step_5}}</div>        
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
      <q-btn @click="addRepair" fab icon="add" color="accent" />
    </q-page-sticky>

    <!-- <q-btn color="primary" size="sm" label="Load more..." @click="repairList();" /> -->
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
    // this.date = date;
    // this.repairList(null);
    // this.repairBadge();
    // this.updateAppStatus({key:'isShowBottomTab',value:true});
    // this.updateAppStatus({key:'enterModule',value:'repair'});

    // var type = this.$route.query.type;
    // var pageTitle = '';
    // if (type == "request_confirm"){
    //   pageTitle = this.lang.need_confirm;
    // }
    // else if (type == "processing"){
    //   pageTitle = this.lang.processing;
    // }
    // else if (type == "finished"){
    //   pageTitle = this.lang.close;
    // }
    // else if (type == "me"){
    //   pageTitle = this.lang.me;
    // }
    // this.updateAppStatus({key:'pageTitle',value:pageTitle});

  },
  watch: {
    "$route.query.type": function (type) {
      //console.dir(id);
      //this.gooutList(type);
    },
  },
  computed: {
      ...mapGetters({
      repairs: 'core/getRepairs',
      appStatus: 'core/getAppStatus',
      lang: 'core/getLang'
    })
  },
  methods: {
    ...mapActions({
      updateRepairs: 'core/updateRepairs',
      refreshRepairs: 'core/refreshRepairs',
      updateAppStatus: 'core/updateAppStatus',
      updateRepairBadge: 'core/updateRepairBadge'
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
        name: 'repairDetail', 
        params: { item }
      });
    },
    refresh(done){
      console.dir(this.repairs[0]);
      this.$axios.get('/dev/equip/repairList/?type='+this.repairsParams.type+'&last_id='+this.repairs[0].id)  
      .then((response) => {
        if (response.data.success){
          this.refreshRepairs(response.data.data);
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
    repairBadge(){
      this.$axios.get('/dev/equip/statusNum/').then((response) => {
        console.dir(response.data);
        if (response.data.success){
          this.updateRepairBadge(response.data.data);
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
      console.dir(this.repairs.length);
      if (index == 1){
        var wait = 1000;
      }
      else{
        var wait = 10;
      }
      if (this.repairs.length >= 10){
        setTimeout(() => {
          if (index > 1){
            this.repairList(index, done);
          }
          else{
            done();
          }
        }, wait)
      }
      else{
        done();
      }

    },
    repairList(index, done){
      //console.dir("======done");
      //console.dir(done);
      if (this.appStatus.isViewDetail){
        this.updateAppStatus({key:'isViewDetail',value:false});
        this.repairsParams.page = this.appStatus.repairPageNum;
        if (done){
          done(true);
        }        
        return;
      }

      this.repairsParams.page = this.repairsParams.page+1;
      if (this.$route.query && this.$route.query.type !== undefined){
        this.repairsParams.type = this.$route.query.type;
      }

      // console.dir(this.repairsParams);
      this.updateAppStatus({key:'repairQueryType', value:this.repairsParams.type});
      this.$axios.get('/dev/equip/repairList/?page='+this.repairsParams.page+'&type='+this.repairsParams.type)  
      .then((response) => {
        
        if (response.data.success){
          this.updateAppStatus({key:'repairPageNum', value:this.repairsParams.page});
          this.updateRepairs(response.data.data);
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
    addRepair(){
      this.$router.push({
        path: '/addRepair'
      });
    },
    confirm(type, id){
      const params = {
        id: id,
        type: type
      };
      this.$axios.post('/dev/user/gooutConfirm/', qs.stringify(params))
      .then((response) => {
        //console.dir(response.data);
        if (response.data.success){
          this.lists = response.data.data;
        }
        else{
          this.$q.notify({ type: 'negative', message: response.data.message });
        }
      }).catch(error => {
        console.dir(error.response);
        if (error.response.status == 401){
          this.$router.push('/login');
        }
      });
    }
    // ,
    // scrolled: debounce(function (position) {
    //   // when this method is invoked then it means user
    //   // has scrolled the Page to 'position'
    //   //
    //   // 'position' is an Integer designating the current
    //   // scroll position in pixels.
      
    //   if (position > 0){
    //     //this.repairList();
    //     console.dir(position);
    //   }
    // }, 200) // debounce for 200ms
  },
  data() {
    return {
      lists:[],
      item:[],
      isShow:false,
      repairsParams:{type:'request_confirm', page:0}
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
