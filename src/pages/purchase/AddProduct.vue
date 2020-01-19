<template>
  <q-page padding class="q-ml-md q-mr-md">
    <q-form
      @submit="addProduct"
      @reset="onReset"
      class="q-gutter-md"
    >
      <!-- <h5 class="q-ma-none q-pa-none q-display-1 q-display-1-opacity text-center">Add Repair</h5> -->
      <div class="edit q-mt-md">
      
      <q-select
        filled
        v-model="item.product"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="productOptions"
        @filter="filterProduct"
        :label=lang.select_purchased_item
        @input="productOnChange"
        :rules="rules"
        style=""
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <div>
      <!-- <q-btn label="Model" color="primary" @click="isSelectModel = true" /> -->
      
      <!-- <div class="row">
        <div class="col">
          {{lang.qty}}
        </div>
        <div class="col">
          {{lang.unit_price}}
        </div>
        <div class="col">
          {{lang.sub_total}}
        </div>                
      </div>   -->
      <div class="row">
        <div class="col">
          <q-input
            v-model="item.qty"
            type="number"
            :label=lang.qty
            :rules="numberRules"
            style="padding-left:10px;"
            @focus.native="$event.target.select()" 
            @input="item.sub_total=item.qty*item.unit_price"
          >
          </q-input>
        </div>
        <div class="col">
          <q-input
            v-model="item.unit_price"
            type="number"
            :label=lang.unit_price
            style="padding-left:10px;"
            @focus.native="$event.target.select()" 
            @input="item.sub_total=item.qty*item.unit_price"
          >
          </q-input>
        </div>
        <div class="col">
          <q-input
            v-model="item.sub_total"
            type="number"
            :label=lang.sub_total
            readonly
            style="padding-left:10px;"
            @focus.native="$event.target.select()" 
          >
          </q-input>
        </div>                
      </div>  

      <div class="row">
        <div class="col">
          {{lang.note}}<br>
          <div class="q-mt-sm q-mb-md" style="max-width: 100%">
          <q-input
            v-model="item.note"
            filled
            type="textarea"
          />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col text-center">
        <q-img v-if="item.photo != ''"
          :src="item.photo"
          spinner-color="white"
          style="width: 60px;border:1px solid #CCCCCC"
          @click="showImage(item)" 
        />
      <q-uploader
        url=""
        label="上傳檔案"
        batch
        @added="fileSelected"
        @removed="removeUploadImage"
        hide-upload-btn
        style="width:100%;"
        color="grey-6"
      />

        </div>
      </div>

    </div>

    <q-btn no-caps color='red' class='full-width q-mt-md' type="submit">{{lang.add_product}}</q-btn>
    <!--<q-btn color='primary' class='full-width q-mt-md' @click="add">Add2</q-btn>-->
    </div>
  </q-form>
  </q-page>
</template>

<script>

import marked from 'marked';
import qs from 'qs';
//import { date } from 'quasar'
import { mapGetters, mapActions } from 'vuex'

export default {
  components:{
  },
  mounted(){
    this.getProducts();
    this.updateAppStatus({key:'isShowBottomTab',value:false});
    this.updateAppStatus({key:'isViewDetail',value:true});
    //console.dir(this.appStatus);
    this.updateAppStatus({key:'pageTitle',value:this.lang.add_product});
    if (this.$route.params.k !== undefined){
      this.item = this.$route.params;
    }
    
    // console.dir("+++");
    // console.dir(this.$route.params);
    //console.dir(this.item);
  },
  computed: {
    // markdown() {
    //   return marked(this.note, { sanitize: true });
    // },
    ...mapGetters({
      user: 'login/user',
      lang: 'core/getLang',
      appStatus: 'core/getAppStatus',
      cacheProducts:'core/getCacheProduct'
    }),
    date:{
      get () {
        if (this.dateProxy === null){
          let timeStamp = Date.now();
          let d = date.formatDate(timeStamp, 'YYYY/MM/DD');
          return d;
        }
        else{
          return this.dateProxy;
        }
        
      },
      set (value) {
        this.dateProxy = value;
      }
    },
    // datetime: {
    //   get () {
    //     let timeStamp = Date.now();
    //     let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
    //      return formattedString;
    //   },
    //   set (value) {
    //     //console.dir(value);
    //   }
    // },
  },
  methods: {
    ...mapActions({
      updateAppStatus: 'core/updateAppStatus',
      addCacheProduct: 'core/addCacheProduct'
    }),
    inputQty(v){
      console.dir(v);
    },
    inputUnitPrice(v){

    },
    getSubTotal(){
      
    },
    removeUploadImage(files){
      this.item.photo = "";
    },
    // showSelectModel(){
    //   if (this.item.equip_id > 0){
    //     this.isSelectModel = true;
    //   }
    //   else{
    //     this.$q.notify({ type: 'negative', color:'red', message: 'Please select equipment first!' });
    //   }
    // },
    productOnChange(val){
      //this.item.model_id = val.value;
    },
    getProducts(){
      this.$axios.get('/dev/purchase/products/').then((response) => {
        if (response.data.success){
          var _ps = [];

          response.data.data.forEach(function(p){
            var e = {label:p.item_name, value:p.id};
            _ps.push(e);
          });
          let removeIndex = null;
          this.cacheProducts.forEach(function(p){
            var removed = _ps.filter(function(_p, index) {
              if (p.product.value == _p.id){
//                console.dir(p);
//                console.dir("index="+index);
                removeIndex = index;
                return true;
              }
            }, removeIndex);
            _ps.splice(removeIndex, 1);
            //console.dir(removeIndex);
          });

          this.products = _ps;
          this.productOptions = _ps;
        }
        else{
          this.$q.notify({ type: 'negative', message: response.data.message });
        }
      }).catch(error => {
        console.dir(error);
        if (error.response.status == 401){
          this.$router.push('/login');
        }
      });
    },
    filterProduct (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.productOptions = this.products.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    addProduct(){
      //console.dir(this.product);
      console.dir(this.item);
      this.addCacheProduct(this.item);
      this.$router.go(-1);
    },
    onReset () {
      this.item = {equip_id:null, model_id:null,location:'',problem_desc:''};
      this.equip = null;
      this.model = null;
    },
    fileSelected(files) {
      console.dir(files);
      var _file = ''
      files.forEach(function(file, k){
        //base64
        _file = file.__img.src;
        //console.dir(file.__img.src);
      });
      this.item.photo = _file;
      this.check_if_document_upload=true

      // var _files = this.selectedFiles;
      // var _selectedNum = _files.length;
      // files.forEach(function(file, k){
      //   //base64
      //   _files[_selectedNum+k]= file.__img.src;
      //   //console.dir(file.__img.src);
      // });
      // this.selectedFiles = _files;
      // this.check_if_document_upload=true
    },

  },
  data() {
    return {
      rules: [
        //(val) => console.dir(val)
        (val) => !(val.label == undefined) || ''
      ],
      numberRules: [
        (val) => !(val == 0) || '' 
        //:rules="rules"
      ],
      item:{product:{}, qty:0, unit_price:0,sub_total:0,note:'', photo:""},
      options:[],
      product:{},
      products:[],
      productOptions:[],
      hasImage: false,
      selectedFiles:[],
      check_if_document_upload:false,
      isSelectModel:false,
      newModelName:""
      // validations: {
      //   form: {
      //     equip: { required }
      //   }
      // },

    };
  },
};
</script>

<style lang="stylus" scoped>
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
