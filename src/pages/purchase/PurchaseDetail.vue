<template>
  <q-page>
    <!--{{item}}-->
    <div id="q-app" class="q-pa-md">
      <div class="q-pa-md">
        <q-dialog v-model="isShowPhoto">
          <q-btn round color="red" @click="isShowPhoto=false;" icon="close"></q-btn>
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
            <q-carousel-slide :style="screenWidth" class="column no-wrap flex-center" :img-src="largeImage" :name=1>
            </q-carousel-slide>
          </q-carousel>
        </q-dialog>

        <!-- <div class="row">
          <div class="col">
            <div class="text-h6">{{item.equip_name}}</div>
            <div class="text-right">{{item.model}}</div>
          </div>
        </div> -->
        <div class="row">
          <div class="col">
            <div>#{{purchase.id}}</div>
          </div>
          <div class="col">  
            <div class="text-right">{{purchase.created_at}}</div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-icon name="fas fa-user" />&nbsp;{{purchase.dept_name}}
          </div>
          <div class="col text-right">
            {{purchase.full_name}}
          </div>
        </div>

        <div style="border:2px solid #CCCCCC" class="q-mt-md">
          <div v-for="item in items" :key="item.id">
            <div class="row">
              <div class="col bg-gray">
                <div class="text-h6">{{item.item_name}}</div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div>{{lang.qty}}</div>
                <div>{{item.qty}}</div>
              </div>
              <div class="col">
                <div>{{lang.unit_price}}</div>
                <div>{{item.unit_price}}</div>
              </div>
              <div class="col">
                <div>{{lang.sub_total}}</div>
                <div>{{item.sub_total}}</div>
              </div>                            
              <div class="col">
                <img v-if="item.photo.length > 0"
                  :src="`${domainName}${item.photo}`"
                  spinner-color="white"
                  style="height:50px"
                  @click="showImage(item)" 
                />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div><q-icon name="far fa-comment" /></div>
                {{item.note}}
              </div>
            </div>
          </div>
        </div>

        <div class="q-mt-md" v-if="purchase.mgrs && purchase.mgrs.length > 0">
          <div class="row bg-gray">
            <div class="col">
              <q-icon class="fas fa-users-cog" />&nbsp;{{lang.manager}}
            </div>
          </div>
          <div v-for="mgr in purchase.mgrs" :key="mgr.id">
          <div class="row">
            <div class="col">
              <q-icon name="fas fa-user" />&nbsp;{{mgr.full_name}}
            </div>
            <div class="col text-right">
              {{mgr.created_at}}
            </div>
          </div>
          </div>
        </div>

        <div class="q-mt-md" v-if="users.length > 0">
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
          <div class="row bb-gray q-mb-md">
            <div class="col comment" v-if="u.note != null && u.note.length > 0">
              <q-icon name="far fa-comment" />&nbsp;<pre>{{u.note}}</pre><br>
            </div>
            <q-btn cl v-if="(user.user_id == u.user_id) && purchase.is_closed == 0" color='red' class='q-mt-sm text-capitalize full-width' @click="responseJob(u)"><q-icon name="far fa-comment" />&nbsp;{{lang.response_the_job}}</q-btn>
          </div>
        </div>
        </div>

        <q-btn v-if="purchase.is_closed == 1" color='grey-7' class='text-capitalize full-width q-mt-md' @click="deliveryHistory({purchase:purchase})">{{lang.acceptance_history}}</q-btn>

        <q-btn v-if="buttons.show_delivery == 1" color='red' class='text-capitalize full-width q-mt-md' @click="acceptanceForm({purchase:purchase, items:items})">{{lang.acceptance_form}}</q-btn>

        <q-btn v-if="buttons.show_assign_job == 1" color='red' class='text-capitalize full-width q-mt-md' @click="assignJob()">{{lang.assign_job}}</q-btn>

        <q-btn v-if="buttons.show_manager_confirm == 1 && purchase.step==1" color='red' class='text-capitalize full-width q-mt-md' @click="confirmed('confirmed')">{{lang.ga_manager_confirm}}</q-btn>

        <q-btn v-if="buttons.show_forward_boss == 1" color='red' class='text-capitalize full-width q-mt-md' @click="confirmed('forwardBoss')">{{lang.forward_boss}}</q-btn>

        <q-btn v-if="buttons.show_manager_confirm == 1 && purchase.step==0" color='red' class='text-capitalize full-width q-mt-md' @click="confirmed('confirmed')">{{lang.manager_confirm}}</q-btn>

        <q-btn v-if="buttons.show_delete == 1" color='red' class='text-capitalize full-width q-mt-md' @click="deletePurchase">{{lang.delete}}</q-btn>

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
    this.purchaseDetail();
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
    showImage(item){
      this.isShowPhoto = true;
      this.largeImage = this.domainName+item.photo;
      //console.dir(this.largeImage);
    },
    responseJob(user){
      console.dir(user);
      user.item_id = this.purchase.id;
      this.$router.push({name:'responsePurchaseJob', params:user});
    },
    assignJob(){
      const params ={
        purchase:this.purchase,
        items:this.items
      }
      this.$router.push({name:'assignPurchaseJob', params:params});
    },
    acceptanceForm(params){
      this.$router.push({name:'acceptanceForm', params:params});
    },
    deliveryHistory(p){
      console.dir("deliveryHistory");
      console.dir(p);
      this.$router.push({name:'deliveryHistory', params:p});
    },
    confirmed(funcName){
      this.$axios.post('/dev/purchase/'+funcName+'/?id='+this.purchase.id)
      .then((response) => {
        if (response.data.success){
          this.updateAppStatus({key:'lastPurchaseQueryType', value:""});
          this.updateAppStatus({key:'isViewDetail',value:false});
          this.$q.notify({ type: 'positive', color:'green-9', message: 'Success.' });
          this.purchaseDetail();
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
    deletePurchase(){
      this.$axios.post('/dev/purchase/delete/?id='+this.purchase.id)
      .then((response) => {
        if (response.data.success){
          this.updateAppStatus({key:'lastPurchaseQueryType', value:""});
          this.updateAppStatus({key:'isViewDetail',value:false});
          this.$q.notify({ type: 'positive', color:'green-9', message: 'Success.' });
          this.$router.push({path:'/purchase', query: {type: this.appStatus.purchaseQueryType}});
        }
        else{
          this.$q.notify({ type: 'negative', color: 'red', message: 'Do not success!' });
        }
      }).catch(error => {
        console.dir(error.response);
        if (error.response.status == 401){
          this.$router.push('/login');
        }
        //this.$q.notify({ type: 'negative', message: error.response.data.error });
      });
    },
    purchaseDetail(){
      //console.dir("+++");
      if(this.$route.params.item == undefined){
        var id = this.appStatus.lastViewItem.id;
      }
      else{
        this.updateAppStatus({key:'lastViewItem', value:this.$route.params.item});
        var id = this.$route.params.item.id;
      }

      this.$axios.post('/dev/purchase/detail/?id='+id)
      .then((response) => {
        console.dir("purchaseDetail");
        console.dir(response.data);
        if (response.data.success){
          this.purchase = response.data.data.purchase;
          this.items = response.data.data.items;
          this.users = response.data.data.users;
          this.buttons = response.data.data.buttons;
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
      purchase:{},
      items:[],
      users:[],
      buttons:[],
      domainName:'http://eslite.sites.com.mm/',
      isShowPhoto:false,
      slide:1,
      screenWidth: 'width:350px',
      largeImage:''
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
