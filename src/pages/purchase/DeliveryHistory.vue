<template>
  <q-page>

    <q-list id="q-app" class="q-pa-md scroll my-list">
      
      <div>
        <div>
          <div style="border:2px solid #cccccc" class="q-ma-md">
          <div class="row">
            <div class="col">
              #{{purchase.id}}
            </div>
            <div class="col text-right">
              {{purchase.created_at}}
            </div>
          </div>
          <div class="row">
            <div class="col">
              #{{purchase.dept_name}}
            </div>
            <div class="col text-right">
              {{purchase.full_name}}
            </div>
          </div>
          </div>

          <div class="q-pa-md" @click="viewDetail(item);" v-for="item in items" :key="item.id" clickable>

              <div class="row bg-gray">
                <div class="col">
                  {{lang.acceptance_num}}
                </div>
                <div class="col text-right">
                  {{item.delivery_num}}
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

            </div>
        </div>
      </div>
      
    </q-list>

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
    this.updateAppStatus({key:'isShowBottomTab',value:true});
    this.updateAppStatus({key:'enterModule',value:'purchase'});
    var pageTitle = 'Add Purchase Request';
    this.updateAppStatus({key:'pageTitle',value:pageTitle});

    if (this.$route.params.purchase != undefined){
      this.purchaseId = this.$route.params.purchase.id;
      this.updateAppStatus({key:'enterId', value:this.$route.params.purchase.id});
    }
    else{
      this.purchaseId = this.appStatus.enterId;
    }
    this.getItems();
  },
  watch: {
    "$route.query.type": function (type) {
      //console.dir(id);
      //this.gooutList(type);
    },
  },
  computed: {
      ...mapGetters({
      appStatus: 'core/getAppStatus',
      lang: 'core/getLang'
    })
  },
  methods: {
    ...mapActions({
      updateAppStatus: 'core/updateAppStatus'
    }),
    getItems(){
      this.$axios.post('/dev/purchase/deliveryHistory/?id='+this.purchaseId)
      .then((response) => {
        // console.dir("purchaseDetail");
        // console.dir(response.data);
        if (response.data.success){
          //console.dir(response.data);
          this.purchase = response.data.data.purchase[0];
          this.items = response.data.data.logs;
        }
        else{
          this.$q.notify({ type: 'negative', color: 'green-9', message: response.data.message });
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
    viewDetail(item){
      item.isViewHistory = true;
      this.$router.push({
        name: 'deliveryDetail', 
        params: { item }
      });
    },
  },
  data() {
    return {
      purchase:{},
      purchaseId:null,
      items:[],
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
