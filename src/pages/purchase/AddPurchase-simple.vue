<template>
  <q-page>

    <q-list id="q-app" class="q-pa-md scroll my-list">
      
      <div>
        <div>
          <div class="q-pa-md">
              <div class="row bg-gray">
                <div class="col">

                </div>
                <div class="col text-right">

                </div>
              </div>
              <div class="row">
                <div class="col">

                </div>
                <div class="col text-right">
                  <q-icon name="far fa-user" />
                </div>                
              </div>
              <div class="row">
                <div class="col">
                  <q-btn color="red" name="far fa-plus">Add</q-btn>
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

    var type = this.$route.query.type;
    var pageTitle = 'Add Purchase Request';
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
      appStatus: 'core/getAppStatus',
      lang: 'core/getLang'
    })
  },
  methods: {
    ...mapActions({
      updateAppStatus: 'core/updateAppStatus'
    }),
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
    },
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
