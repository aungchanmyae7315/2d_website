<template>
  <q-page>
    <!--{{item}}-->
    <div id="q-app" class="q-pa-md">
      <q-form
      @submit="commentJob"
      @reset="onReset"
      class="q-gutter-md"
      >
      <div class="q-pa-md">
        <div class="row">
          <div class="col">
            <div class="text-h6">{{responseUser.full_name}}</div>
            <!-- <div class="text-right">{{item.model}}</div> -->
          </div>
        </div>

        <div class="row">
          <div class="col">
            {{lang.note_working_description}}:
            <q-input
              label=""
              v-model="note"
              filled
              type="textarea"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-checkbox v-model="isCompleted" /> {{lang.is_complete}}
          </div>
        </div>

        <q-btn color='red' class='full-width q-mt-md' type="submit">Assign job</q-btn>

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

    this.responseUser = this.$route.params;
    this.note = this.responseUser.note;
    if (this.responseUser.is_completed == 1){
      this.isCompleted = true;
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
    commentJob(){
      if (this.isCompleted){
        var is_completed = 1;
      }
      else{
        var is_completed = 0;
      }
      const params = {
        id: this.responseUser.item_id,
        note: this.note,
        is_completed: is_completed
      };
      
      //return;
      this.$axios.post('/dev/equip/commentJob/', qs.stringify(params))
      .then((response) => {
        if (response.data.success){
          this.$router.go(-1);
          // console.dir(response.data);
          // this.item.id = this.responseUser.item_id;
          // this.$router.push({
          //   name: 'repairDetail', 
          //   params: this.item
          // });
          
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
      item:{},
      responseUser:[],
      rules: [
        (val) => !!val || 'Date is required'
        //:rules="rules"
      ],
      note:'',
      isCompleted:false
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
