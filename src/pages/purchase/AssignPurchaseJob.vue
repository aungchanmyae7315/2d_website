<template>
  <q-page>
    <!--{{item}}-->
    <div id="q-app" class="q-pa-md">
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
      <q-form
      @submit="assignJob"
      @reset="onReset"
      class="q-gutter-md"
      >
      <div class="q-pa-md">
        <!-- <div class="row">
          <div class="col">
            <div class="text-h6">{{item.equip_name}}</div>
            <div class="text-right">{{item.model}}</div>
          </div>
        </div> -->

        <div class="row">
          <div class="col">
            #{{item.id}}
          </div>
          <div class="col text-right">
            {{item.created_at}}
          </div>
        </div>
        <div class="row">
          <div class="col">
            {{item.full_name}}
          </div>
          <div class="col text-right">
            {{item.dept_name}}
          </div>
        </div>


        <div class="q-mt-md">
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

      <q-select
        class="q-mt-md"
        filled
        v-model="selectedUsers"
        multiple
        :options="deptUsers"
        label="Please select user"
        style="width: 100%"
        :rules="rules"
      />

      <q-btn no-caps color='red' class='full-width q-mt-md' type="submit">Assign job</q-btn>

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
    //this.gooutList();
    //console.dir(this.$route);
    this.updateAppStatus({key:'isViewDetail',value:true});
    this.updateAppStatus({key:'isShowBottomTab',value:false});
    //this.purchaseDetail();
    this.item = this.$route.params.purchase;
    this.items = this.$route.params.items;
    this.getDeptUsers();
    // console.dir("user-data");
    // console.dir(this.user);
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
    assignJob(){
      var users_id = [];
      this.selectedUsers.forEach(function(user){
        users_id.push(user.value);
      });
      //console.dir(users_id);
      //this.$router.push({name:'assignRepairJob', query:this.item.id});
      const params = {
        id: this.item.id,
        users_id: users_id
      };

      this.$axios.post('/dev/purchase/assignJob/?id='+this.item.id, qs.stringify(params))
      .then((response) => {
        if (response.data.success){
          this.$router.push({
            name: 'purchaseDetail', 
            params: { id:this.item.id }
          });
          // console.dir(response.data);
          // this.updateAppStatus({key:'lastRepairQueryType', value:""});
          // this.updateAppStatus({key:'isViewDetail',value:false});
          // this.$q.notify({ type: 'positive', color:'green-9', message: 'Success.' });
          // this.purchaseDetail();
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
    },
    getDeptUsers(){
      this.$axios.post('/dev/user/deptUsers/?dept_type=ga')
      .then((response) => {
        if (response.data.success){
          // this.updateAppStatus({key:'lastRepairQueryType', value:""});
          // this.updateAppStatus({key:'isViewDetail',value:false});
          // this.$q.notify({ type: 'positive', color:'green-9', message: 'Success.' });
          // this.purchaseDetail();

          // this.deptUsers = response.data.data;
          console.dir(response.data.data);
          var _users = [];
          response.data.data.forEach(function(user){
            var label = user.full_name+'('+user.card_number+')';
            var e = {label:label, value:user.user_id};
            _users.push(e);
          });
          this.deptUsers = _users;
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
    },
    purchaseDetail(){
      // console.dir("|||");
      console.dir(this.$route.params);
      this.item = this.$route.params;
    },
  },
  data() {
    return {
      item:{},
      items:[],
      deptUsers:[],
      selectedUsers:null,
      rules: [
        (val) => !!val || ''
        //:rules="rules"
      ],
      domainName:'http://eslite.sites.com.mm/',
      isShowPhoto:false,
      largeImage:'',
      screenWidth: 'width:350px',
      slide:1
    };
  },
};
</script>

<style lang="stylus" scoped>

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
