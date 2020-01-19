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
            {{purchase.dept_name}}
          </div>
          <div class="col text-right">
            <q-icon name="fas fa-user" />&nbsp;{{purchase.full_name}}
          </div>
        </div>

        <div class="row">
          <div class="col">
            Request pickup
          </div>
          <div class="col text-right">
            <q-icon name="fas fa-user" />&nbsp;{{delivery.delivery_user}}
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
                <div class="text-red text-weight-bold">{{item.qty}}</div>
              </div>
              <div class="col">
                <div>{{lang.unit_price}}</div>
                <div>{{parseInt(item.unit_price).toLocaleString()}}</div>
              </div>
              <div class="col">
                <div>{{lang.sub_total}}</div>
                <div>{{parseInt(item.sub_total).toLocaleString()}}</div>
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

        <div class="row">
          <div class="col text-right text-h6">
            Total: {{total}}
          </div>
        </div>
        <div v-if="isViewHistory">
          <div class="row">
            <div class="col">
              {{delivery.accept_user}}
            </div>
            <div class="col text-right">
              {{delivery.accept_at}}
            </div>            
          </div>          
        </div>
        <div v-if="!isViewHistory">
        <q-btn color='green' class='text-capitalize full-width q-mt-md' @click="acceptance(delivery)">{{lang.acceptance}}</q-btn>

        <q-btn v-if="delivery.is_can_delete == 1" color='red' class='text-capitalize full-width q-mt-md' @click="deleteDelivery()">{{lang.delete}}</q-btn>
        </div>
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
    this.deliveryDetail();
    // console.dir("user-data");
    // console.dir(this.user);
    this.screenWidth = 'width:'+this.$q.screen.width+'px';
    //console.dir(this.$route.params.item);
    if (this.$route.params.item.isViewHistory != undefined){
      this.isViewHistory = this.$route.params.item.isViewHistory;
    }

  },
  watch: {
  },
  computed: {
    ...mapGetters({
      appStatus: 'core/getAppStatus',
      user: 'login/user',
      lang: 'core/getLang'
    }),

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
    acceptanceForm(params){
      this.$router.push({name:'acceptanceForm', params:params});
    },
    acceptance(delivery){
      this.$axios.post('/dev/purchase/deliveryAccept/?id='+delivery.id)
      .then((response) => {
        if (response.data.success){
          this.$router.go(-1);
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
    deleteDelivery(){
      this.$axios.post('/dev/purchase/deliveryDelete/?id='+this.delivery.id)
      .then((response) => {
        if (response.data.success){
          this.updateAppStatus({key:'lastPurchaseQueryType', value:""});
          this.updateAppStatus({key:'isViewDetail',value:false});
          this.$q.notify({ type: 'positive', color:'green-9', message: 'Success.' });
          this.$router.push({path:'/purchase', query: {type: this.appStatus.purchaseQueryType}});
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
    deliveryDetail(){
      // console.dir("+++");
      // console.dir(this.$route.params.item);
      var id = this.$route.params.item.id;

      this.$axios.post('/dev/purchase/deliveryDetail/?id='+id)
      .then((response) => {
        console.dir("deliveryDetail");
        console.dir(response.data);
        if (response.data.success){
          this.purchase = response.data.data.purchase[0];
          this.items = response.data.data.items;
          this.delivery = response.data.data.delivery;
          let _total = 0;
          this.items.forEach(function(item){
            _total += parseInt(item.sub_total);
          });
          this.total = _total.toLocaleString();
        }
        else{
          this.$q.notify({ type: 'negative', color: 'green-9', message: response.data.message });
        }
      }).catch(error => {
        console.dir(error);
        if (error.response.status == 401){
          this.$router.push('/login');
        }
        //this.$q.notify({ type: 'negative', message: error.response.data.error });
      });
    },

  },
  data() {
    return {
      purchase:{},
      delivery:{},
      items:[],
      // users:[],
      // buttons:[],
      domainName:'http://eslite.sites.com.mm/',
      isShowPhoto:false,
      slide:1,
      screenWidth: 'width:350px',
      largeImage:'',
      total:0,
      isViewHistory:false
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
