<template>
  <q-page>
    <q-form
      @submit="add"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-list id="q-app" class="q-pa-md scroll">
        <div>
          <div class="q-pa-md">
              <div v-for="(p, index) in products" :key="p.product.value">
                <div class="row bg-gray q-mt-md">
                  <div class="col">
                    {{p.product.label}}
                  </div>
                </div>
                <div style="border:2px solid #CCCCCC">
                <div class="row">
                  <div class="col">
                    {{lang.qty}}
                  </div>
                  <div class="col">
                    {{lang.unit_price}}
                  </div>
                  <div class="col">
                    {{lang.sub_total}}
                  </div>     
                  <div class="col">                  
                  </div>     
                </div>  
                <div class="row">
                  <div class="col">
                    {{p.qty}}
                  </div>
                  <div class="col">
                    {{p.unit_price}}
                  </div>
                  <div class="col">
                    {{p.sub_total}}
                  </div>     
                  <div class="col">
                  <q-img
                    :src="p.photo"
                    spinner-color="white"
                    style="height: 60px;border:1px solid #CCCCCC"
                    @click="showImage(item)" 
                  />
                  </div>     
                </div>

                <div class="row">
                  <div class="col text-right">
                    <q-btn round color="red" @click="editProduct(p, index)" icon="edit"></q-btn>
                  </div>
                  <div class="col">
                    <q-btn round color="red" @click="deleteProduct(p, index)" icon="delete"></q-btn>
                  </div>
                </div>  
                </div>
              </div>

              <div class="row">
                <div class="col text-center">
                  <q-btn no-caps color="orange-5" text-color="grey-9" @click="addProduct" icon="add">{{lang.add_product}}</q-btn>
                </div>                
              </div>

              <div class="row q-mt-xl">
                <div class="col">
                  <div class="text-h5 text-center">Total: {{totalPrice}}</div>
                </div>                
              </div>
              <div class="row">
                <div class="col">
                  <q-btn color="red" no-caps class="full-width" name="far fa-plus" type="submit">{{lang.add_purchase_form}}</q-btn>
                </div>                
              </div>

            </div>
        </div>
      
      </q-list>
    </q-form>
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
    this.updateAppStatus({key:'isViewDetail',value:true});

    var type = this.$route.query.type;
    var pageTitle = this.lang.add_purchase_form;
    this.updateAppStatus({key:'pageTitle',value:pageTitle});
    let total = 0;
    this.products.forEach(function(p){
      total += p.sub_total;
    });
    this.totalPrice = total;
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
      lang: 'core/getLang',
      products:'core/getCacheProduct'
    })
  },
  methods: {
    ...mapActions({
      updateAppStatus: 'core/updateAppStatus',
      deleteCacheProduct: 'core/deleteCacheProduct'
    }),
    editProduct(p, k){
      p.k = k;
      this.$router.push({name:'addProduct',params:p});
    },
    deleteProduct(p, k){
      p.k = k;
      this.deleteCacheProduct(p);
    },
    addProduct(){
      this.$router.push('/addProduct');
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
    },
    add() {
      // console.dir("add");
      // console.dir(this.products);
      // return;

      // Becasue we're using the Quasar plugin for Axios,
      // we have the ability to access it as this.$axios.
      ///purchase/add?item_id[]={array}&qty[]={array}&unit_price[]={array}&photo[]={base64 array}
      //this.item.files = this.selectedFiles;
      let itemId = [];
      let qty = [];
      let unitPrice = [];
      let photo = [];
      if (this.products.length == 0){
        this.$q.notify({ type: 'positive', color:'red', message: this.lang.add_product });
        return;
      }
      this.products.forEach(function(p){
        itemId.push(p.product.value);
        qty.push(p.qty);
        unitPrice.push(p.sub_total);
        photo.push(p.photo);
      });
      const params = {
        item_id:itemId,
        qty:qty,
        unit_price:unitPrice,
        photo:photo
      };
      this.$axios.post('/dev/purchase/add/', qs.stringify(params))
      .then((response) => {
        console.dir("----");
        console.dir(response);
        if (response.data.success){
          this.updateAppStatus({key:'lastPurchaseQueryType', value:""});
          this.updateAppStatus({key:'isViewDetail',value:false});
          this.$q.notify({ type: 'positive', color:'green-9', message: 'Success.' });
          this.$router.push({path:'/purchase', query: {type: this.appStatus.purchaseQueryType}});

          // console.dir(response.data);
          // this.$router.go(-1);

          // this.updateAppStatus({key:'lastRepairQueryType', value:""});
          // this.$q.notify({ type: 'positive', color:'green-9', message: 'Success.' });
          // this.$router.push({path:'/repair', query: {type: this.appStatus.repairQueryType}});
          //this.$router.go(-1);
        }
        else{
          this.$q.notify({ type: 'negative', message: response.data.message });
        }
      }).catch(error => {
        if (error.response.status == 401){
          this.$router.push('/login');
        }
        //this.$q.notify({ type: 'negative', message: error.response.data.error });
      });
    },
    onReset () {
    },
  },
  data() {
    return {
      item:[],
      isShow:false,
      purchasesParams:{type:'request_confirm', page:0},
      totalPrice:0
    };
  },
};
</script>

<style lang="stylus" scoped>
.bg-gray
  background-color #c5c5c5
.col
  padding 5px

  
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
