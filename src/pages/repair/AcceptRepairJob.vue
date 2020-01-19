<template>
  <q-page>
    <!--{{item}}-->
    <div id="q-app" class="q-pa-md">
      <q-form
      @submit="acceptJob"
      @reset="onReset"
      class="q-gutter-md"
      >
      <div class="q-pa-md">
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
        <div class="row">
          <div class="col">
            {{lang.note}}
            <q-input
              label=""
              v-model="note"
              filled
              type="textarea"
            />
          </div>
        </div>

      <q-btn color='red' class='full-width q-mt-md' type="submit">{{lang.confirm}}</q-btn>

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
    this.repairDetail();
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
  },
  methods: {
    ...mapActions({
      updateAppStatus: 'core/updateAppStatus'
    }),
    acceptJob(){
      //console.dir(users_id);
      //this.$router.push({name:'assignRepairJob', query:this.item.id});
      const params = {
        id: this.item.id,
        note: this.note
      };
      // console.dir(params);
      // this.$router.go(-1);
      // return;
      this.$axios.post('/dev/equip/confirmed', qs.stringify(params))
      .then((response) => {
        if (response.data.success){
          console.dir(response.data);
          this.$router.go(-1);
          // this.updateAppStatus({key:'lastRepairQueryType', value:""});
          // this.updateAppStatus({key:'isViewDetail',value:false});
          // this.$q.notify({ type: 'positive', color:'green-9', message: 'Success.' });
          // this.repairDetail();
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
    repairDetail(){
      // console.dir("|||");
      // console.dir(this.$route.params);
      this.item = this.$route.params;
    },
  },
  data() {
    return {
      item:{},
      note:'',
      rules: [
        (val) => !!val || 'Date is required'
        //:rules="rules"
      ],
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
