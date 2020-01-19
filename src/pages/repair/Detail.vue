<template>
  <q-page>
    <!--{{item}}-->
    <div id="q-app" class="q-pa-md">
      <div class="q-pa-md">
        <q-dialog v-model="isShowPhoto">
          <q-carousel
            arrows
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            v-model="slide"
            control-color="primary"
            navigation-icon="radio_button_unchecked"
            navigation
            padding
            height="100%"
            class="bg-white shadow-1 rounded-borders"
          >
            <q-carousel-slide :style="screenWidth" v-for="(atf, index) in atfs" :key="atf.file" :name="index" class="column no-wrap flex-center" :img-src="atf.photo">
              <!-- <div class="q-mt-md text-center">
              <q-img
                  :src="atf.photo"
                  spinner-color="white"
                  style="width: 300px"
              />
              </div> -->
            </q-carousel-slide>

          </q-carousel>
        </q-dialog>

        <div class="row">
          <div class="col">
            <div class="text-h6">{{item.equip_name}}</div>
            <div class="text-right">{{item.model}}</div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            {{item.dept_name}}
          </div>
        </div>
        <div class="row">
          <div class="col">
            {{item.full_name}}
          </div>
          <div class="col text-right">
            {{item.created_at}}
          </div>
        </div>

        <div v-if="item.mgrs && item.mgrs.length > 0">
          <div class="row bg-gray">
            <div class="col">
              <q-icon class="fas fa-users-cog" />&nbsp;{{lang.manager}}
            </div>
          </div>
          <div v-for="mgr in item.mgrs" :key="mgr.id">
          <div class="row">
            <div class="col">
              {{mgr.full_name}}
            </div>
            <div class="col text-right">
              {{mgr.created_at}}
            </div>
          </div>
          </div>
        </div>

        <div v-if="users.length > 0">
        <div class="row bg-gray">
          <div class="col">
            {{lang.staff}}
          </div>
        </div>
        <div v-for="u in users" :key="u.id">
          <div class="row">
            <div class="col">
              <q-icon name="fas fa-user-cog" />&nbsp;{{u.full_name}}
            </div>
            <div class="col text-right">
              <span>{{u.updated_at}}</span>
            </div>
          </div>
          <div class="row bb-gray q-mb-md" v-if="u.note.length > 0">
            <div class="col comment">
              <q-icon name="far fa-comment" />&nbsp;<pre>{{u.note}}</pre><br>
            </div>
            <q-btn cl v-if="(user.user_id == u.user_id) && item.is_closed == 0" color='red' class='q-mt-none text-capitalize full-width' @click="responseJob(u)"><q-icon name="far fa-comment" />&nbsp;{{lang.response_the_job}}</q-btn>
          </div>
        </div>
        </div>

        <div v-if="atfs.length > 0">
          <div class="row bg-gray">
            <div class="col">
              {{lang.upload_photo}}
            </div>
          </div>
          <div v-for="atf in atfs" :key="atf.file">
            <div class="row">
              <div class="col">
                <q-img
                  :src="atf.photo"
                  spinner-color="white"
                  style="height: 140px; max-width: 150px"
                  @click="isShowPhoto = true" 
                />
              </div>
            </div>
          </div>
        </div>
        <q-btn v-if="user.is_manager && user.is_ga_dept && item.step==4" color='red' class='text-capitalize full-width q-mt-md' @click="acceptJob">{{lang.accept_completion}}</q-btn>

        <q-btn v-if="user.is_manager && user.is_ga_dept && item.step==2" color='red' class='text-capitalize full-width q-mt-md' @click="assignJob">{{lang.assign_job}}</q-btn>
        <q-btn v-if="user.is_manager && user.is_ga_dept && item.step==1" color='red' class='text-capitalize full-width q-mt-md' @click="confirmed">{{lang.ga_manager_confirm}}</q-btn>
        <q-btn v-if="user.is_manager && user.dept_id==item.dept_id && item.step==0" color='red' class='text-capitalize full-width q-mt-md' @click="confirmed">{{lang.manager_confirm}}</q-btn>
        <q-btn v-if="(user.is_manager || user.user_id==item.user_id) && item.step==0" color='red' class='text-capitalize full-width q-mt-md' @click="deleteRepair">{{lang.delete}}</q-btn>

      </div>  
    </div>
  </q-page>  
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import marked from 'marked';
import qs from 'qs';
import { dom } from 'quasar';
const { height, width } = dom;
export default {
  mounted() {
    //this.gooutList();
    //console.dir(this.$route);
    this.updateAppStatus({key:'isViewDetail',value:true});
    this.updateAppStatus({key:'isShowBottomTab',value:false});
    this.repairDetail();
    // console.dir("user-data");
    // console.dir(this.user);
    this.screenWidth = 'width:'+this.$q.screen.width+'px';
  },
  watch: {
  },
  computed: {
    ...mapGetters({
      appStatus: 'core/getAppStatus',
      user: 'login/user',
      lang: 'core/getLang'
    }),
    
    // itemId(){
    //   // console.dir("aaa");
    //    console.dir(this.$route);
    //   return this.$route.params.item.id
    // }
  },
  methods: {
    ...mapActions({
      updateAppStatus: 'core/updateAppStatus'
    }),
    responseJob(user){
      user.item_id = this.item.id;
      this.$router.push({name:'responseJob', params:user});
    },
    acceptJob(){
      this.$router.push({name:'acceptRepairJob', params:this.item});
    },
    assignJob(){
      this.$router.push({name:'assignRepairJob', params:this.item});
    },
    confirmed(){
      this.$axios.post('/dev/equip/confirmed/?id='+this.item.id)
      .then((response) => {
        if (response.data.success){
          this.updateAppStatus({key:'lastRepairQueryType', value:""});
          this.updateAppStatus({key:'isViewDetail',value:false});
          this.$q.notify({ type: 'positive', color:'green-9', message: 'Success.' });
          //this.$router.push({path:'/repairDetail', query: {type: this.appStatus.repairQueryType}});
          //this.$router.push({name: 'repairDetail', params: this.item});
          this.repairDetail();
        }
        else{
          this.$q.notify({ type: 'negative', color: 'green-9', message: response.data.message });
        }
      }).catch(error => {
        console.dir(error.response);
        if (error.response.status == 401){
          this.$router.push('/login');
        }
        //this.$q.notify({ type: 'negative', message: error.response.data.error });
      });
    },
    deleteRepair(){
      this.$axios.post('/dev/equip/deleteRepair/?id='+this.item.id)
      .then((response) => {
        if (response.data.success){
          this.updateAppStatus({key:'lastRepairQueryType', value:""});
          this.updateAppStatus({key:'isViewDetail',value:false});
          this.$q.notify({ type: 'positive', color:'green-9', message: 'Success.' });
          this.$router.push({path:'/repair', query: {type: this.appStatus.repairQueryType}});
        }
        else{
          this.$q.notify({ type: 'negative', color: 'green-9', message: response.data.message });
        }
      }).catch(error => {
        console.dir(error.response);
        if (error.response.status == 401){
          this.$router.push('/login');
        }
        //this.$q.notify({ type: 'negative', message: error.response.data.error });
      });
    },
    repairDetail(){
      //console.dir("+++");
      if(this.$route.params.item == undefined){
        var id = this.appStatus.lastViewItem.id;
      }
      else{
        this.updateAppStatus({key:'lastViewItem', value:this.$route.params.item});
        var id = this.$route.params.item.id;
      }

      this.$axios.post('/dev/equip/repairDetail/?id='+id)
      .then((response) => {
        console.dir("repairDetail");
        console.dir(response.data);
        if (response.data.success){
          this.item = response.data.data.equip;
          this.users = response.data.data.users;
          this.atfs = response.data.data.atfs;
          console.dir(this.users);
        }
        else{
          this.$q.notify({ type: 'negative', color: 'green-9', message: response.data.message });
        }
      }).catch(error => {
        console.dir(error.response);
        if (error.response.status == 401){
          this.$router.push('/login');
        }
        //this.$q.notify({ type: 'negative', message: error.response.data.error });
      });
    },
    // confirm(type, id){
    //   const params = {
    //     id: id,
    //     type: type
    //   };
    //   this.$axios.post('/dev/user/gooutConfirm/', qs.stringify(params))
    //   .then((response) => {
    //     //console.dir(response.data);
    //     if (response.data.success){
    //       this.lists = response.data.data;
    //     }
    //     else{
    //       this.$q.notify({ type: 'negative', message: response.data.message });
    //     }
    //   }).catch(error => {
    //     console.dir(error.response);
    //     if (error.response.status == 401){
    //       this.$router.push('/login');
    //     }
    //   });
    // },
  },
  data() {
    return {
      item:{},
      users:[],
      atfs:[],
      domainName:'http://eslite.sites.com.mm/',
      isShowPhoto:false,
      slide:1,
      screenWidth: 'width:350px',
    };
  },
};
</script>

<style lang="stylus" scoped>
.comment{
  background-color #eaeaea
  padding 5px
}
.comment pre
  padding 0
  margin 0

#q-app .bg-gray
  background-color #c5c5c5
  margin-top 15px
#q-app .col
  padding 5px
#q-app .bb-gray
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
