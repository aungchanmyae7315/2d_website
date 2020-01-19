<template>
  <q-page>
    <!--{{item}}-->
    <div id="q-app" class="q-pa-md">
      <q-form
      @submit="submitForm"
      @reset="onReset"
      class="q-gutter-md"
      >
      <div class="q-pa-md">
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

        <div class="q-mt-md"></div>
        <div style="border:2px solid #CCCCCC">
          <div v-for="item in items" :key="item.id">
            <div class="row">
              <div class="col bg-gray">
                <div class="text-h6">{{item.item_name}}</div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="text-weight-bold">{{lang.qty}}</div>
                <div>
                  {{item.qty}}
                </div>
              </div>
              <div class="col">
                <div class="text-weight-bold">{{lang.unit_price}}</div>
                <div>{{item.unit_price}}</div>
              </div>
              <div class="col">
                <div class="text-weight-bold">{{lang.sub_total}}</div>
                <div>{{item.sub_total}}</div>
              </div>                            
              <div class="col">
                <img v-if="item.photo != undefined && item.photo.length > 0"
                  :src="`${domainName}${item.photo}`"
                  spinner-color="white"
                  style="height:50px"
                  @click="showImage(item)" 
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="text-red-7 text-weight-bold">Remain</div>
                <span class="text-red-7">{{item.remain_num}}</span>
              </div>
              <div class="col">
                  <div class="q-ml-sm">{{lang.qty}} &lt;= {{item.remain_num}}</div>
                  <q-input
                    bg-color="grey-4"
                    v-model="item.inputQty"
                    type="number"
                    style="padding-left:10px;"
                    @focus.native="$event.target.select()" 
                    @input="inputCheck(item)"
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

        <q-btn no-caps color='red' class='full-width q-mt-md' type="submit">{{lang.submit}}</q-btn>

      </div>  
      </q-form>
    </div>
  </q-page>  
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import marked from 'marked';
import qs from 'qs';
export default {
  mounted() {
    // this.updateAppStatus({key:'isViewDetail',value:true});
    // this.updateAppStatus({key:'isShowBottomTab',value:false});

    // this.responseUser = this.$route.params;
    // this.note = this.responseUser.note;
    // if (this.responseUser.is_completed == 1){
    //   this.isCompleted = true;
    // }
    this.purchase = this.$route.params.purchase;
    this.items = this.$route.params.items;
    // console.dir(this.items);
    // this.deliveryItems = this.getDeliveryItems();
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
    inputCheck(item){
      if(item.inputQty > item.remain_num){
        this.$q.notify({ type: 'negative', color: 'red', message: 'aaa' });
      }
      console.dir(item);
    },
    // getDeliveryItems(){
    //   const params = {id:this.purchase.id};
    //   console.dir(this.$route.params);
    //   this.$axios.post('/dev/purchase/deliveryHistory/', qs.stringify(params))
    //   .then((response) => {
    //     console.dir("+++");
    //     console.dir(response.data);
    //     this.deliveryItems = response.data.data;
    //   }).catch(error => {
    //     this.error(error);
    //   });
    // },
    submitForm(){
      let itemsId = [];
      let qtys = [];
      let q = this.$q;
      let isCorrect = true;
      console.dir(this.items);
      this.items.forEach(function(item){
        if ((item.inputQty > item.remain_num || item.inputQty == undefined) && isCorrect){
          q.notify({ type: 'negative', color: 'red', message:'Incorrect number' });
          isCorrect = false;
        }
        itemsId.push(item.id);
        qtys.push(item.inputQty);
      });
      if (!isCorrect){
        return;
      }

      const params = {
        purchase_id: this.purchase.id,
        items_id: itemsId,
        qtys: qtys
      };      
      // console.dir(params);
      // this.$router.go(-1);          
      // return;
//return;
      ///purchase/delivery?purchase_id={req}&items_id={array}&qtys={array}
      this.$axios.post('/dev/purchase/delivery/', qs.stringify(params))
      .then((response) => {
        if (response.data.success){
          this.$router.go(-1);          
        }
        else{
          this.$q.notify({ type: 'negative', color: 'green-9', message: response.data.message });
        }
      }).catch(error => {
        this.error(error);
      });

    },
    onReset(){

    },
    error(error){
      if (error.response.status == 401){
        this.$router.push('/login');
      }
    }
  },
  data() {
    return {
      id:0,
      purchase:{},
      items:[],
      rules: [
        (val) => !!val || 'Date is required'
        //:rules="rules"
      ],
      numberRules: [
        (val) => !(val == 0) || '' 
        //:rules="rules"
      ],
      domainName:'http://eslite.sites.com.mm/'
    };
  },
};
</script>

<style lang="stylus" scoped>

#q-app .bg-gray
  background-color #c5c5c5
#q-app .col
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
