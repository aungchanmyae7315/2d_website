<template>
  <q-page padding class="q-ml-md q-mr-md">
    <q-form
      @submit="add"
      @reset="onReset"
      class="q-gutter-md"
    >
    <div>
      <!-- <h5 class="q-ma-none q-pa-none q-display-1 q-display-1-opacity text-center">Add Repair</h5> -->
      <div class="edit q-mt-md">
      
      <q-select
        filled
        v-model="equip"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="equipOptions"
        @filter="filterEquip"
        :label=lang.equipment_name
        @input="equipOnChange"
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
      
      <div class="row">
        <div class="col">
          <q-input style="padding-left:10px;" 
          v-model="item.model_name" 
          :label="lang.equipment_model"  
          @click="showSelectModel" 
          :rules="rules"
          />
        </div>
      </div>  
      <q-dialog v-model="isSelectModel" transition-show="rotate" transition-hide="rotate">
        <q-card style="width:100%">
          <q-card-section>
            <div class="text-h6">Please select model</div>
          </q-card-section>

          <q-card-section>
            <div >
              <q-list bordered separator>
                <q-item>
                  <q-input
                    v-model="newModelName"
                    type="string"
                    label="New model"
                    style="padding-left:10px;width:100%"
                    @focus.native="$event.target.select()" 
                  />            
                  <q-btn class="q-mt-sm" :label="lang.add" color="red" @click="addNewModel" />    
                </q-item>
                <q-item @click="selectModel(m)" v-for="m in modelOptions" :key="m.value" clickable>
                  <q-item-section>{{m.label}}</q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <!-- <q-btn flat label="Decline" color="primary" v-close-popup /> -->
            <q-btn flat label="Close" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      </div>
      <!-- <q-select
        filled
        v-model="model"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="modelOptions"
        @filter="filterModel"
        :label=lang.equipment_model
        @input="modelOnChange"
        :rules="rules"
        style="padding-bottom: 32px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select> -->

      <div class="row">
        <div class="col">
          <q-input
            v-model="item.location"
            type="string"
            :label=lang.repair_location
            :rules="rules"
            style="padding-left:10px;"
            @focus.native="$event.target.select()" 
          >
          </q-input>
        </div>
      </div>  
      <div class="row">
        <div class="col">
          <q-input
            v-model="item.problem_desc"
            type="string"
            :label=lang.problem_description
            :rules="rules"
            style="padding-left:10px;"
            @focus.native="$event.target.select()" 
          >
          </q-input>
        </div>
      </div>  
      <div class="row">
        <div class="col">
          
      <q-uploader
        url="http://eslite.sites.com.mm/en/home/upload/"
        label="上傳檔案"
        multiple
        batch
        @added="fileSelected"
        hide-upload-btn
        style="width:100%;"
      />

        </div>
      </div>

    </div>

    <q-btn color='red' class='full-width q-mt-md' type="submit">{{lang.add}}</q-btn>
    <!--<q-btn color='primary' class='full-width q-mt-md' @click="add">Add2</q-btn>-->
    </div>
  </q-form>
  </q-page>
</template>

<script>

import marked from 'marked';
import qs from 'qs';
import { date } from 'quasar'
import { mapGetters, mapActions } from 'vuex'

export default {
  components:{
  },
  mounted(){
    this.getEquips();
    this.updateAppStatus({key:'isShowBottomTab',value:false});
    this.updateAppStatus({key:'isViewDetail',value:true});
    console.dir(this.appStatus);
    this.updateAppStatus({key:'pageTitle',value:this.lang.add});
  },
  computed: {
    // markdown() {
    //   return marked(this.note, { sanitize: true });
    // },
    ...mapGetters({
      user: 'login/user',
      lang: 'core/getLang',
      appStatus: 'core/getAppStatus',
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
      updateAppStatus: 'core/updateAppStatus'
    }),
    showSelectModel(){
      if (this.item.equip_id > 0){
        this.isSelectModel = true;
      }
      else{
        this.$q.notify({ type: 'negative', color:'red', message: 'Please select equipment first!' });
      }
    },
    addNewModel(){
      const params = {
        equip_id:this.item.equip_id,
        model:this.newModelName
      }
      this.$axios.post('/dev/equip/addModel/', qs.stringify(params))
      .then((response) => {
        if (response.data.success){
          this.newModelName = '';
          this.getModels(this.item.equip_id);
          // this.updateAppStatus({key:'lastRepairQueryType', value:""});
          // this.$q.notify({ type: 'positive', color:'green-9', message: 'Success.' });
          // this.$router.push({path:'/repair', query: {type: this.appStatus.repairQueryType}});
          // //this.$router.go(-1);
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
    selectModel(val){
      //console.dir(model);
      this.item.model_name = val.label;
      this.item.model_id = val.value;
      this.isSelectModel = false;
    },
    equipOnChange(val){
      //console.dir(val);
      this.item.equip_id = val.value;
      this.getModels(val.value);
    },
    // modelOnChange(val){
    //   this.item.model_id = val.value;
    // },
    getEquips(){
      this.$axios.get('/dev/equip/equip/').then((response) => {
        if (response.data.success){
          var _equips = [];
          response.data.data.forEach(function(equip){
            var e = {label:equip.equip_name, value:equip.id};
            _equips.push(e);
          });
          this.equips = _equips;
          this.equipOptions = _equips;
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
    getModels(equipId){
      //console.dir("equipId="+this.equipId);
      this.$axios.get('/dev/equip/model/?equip_id='+equipId).then((response) => {
        if (response.data.success){
          var _models = [];
          response.data.data.forEach(function(model){
            var e = {label:model.model, value:model.id};
            _models.push(e);
          });
          this.models = _models;
          this.modelOptions = _models;
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
    filterModel (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.modelOptions = this.models.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterEquip (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.equipOptions = this.equips.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    add() {
      // Becasue we're using the Quasar plugin for Axios,
      // we have the ability to access it as this.$axios.
      this.item.files = this.selectedFiles;
      const params = this.item;
      this.$axios.post('/dev/equip/addRepair/', qs.stringify(params))
      .then((response) => {
        console.dir("----");
        console.dir(response);
        if (response.data.success){
          this.updateAppStatus({key:'lastRepairQueryType', value:""});
          this.$q.notify({ type: 'positive', color:'green-9', message: 'Success.' });
          this.$router.push({path:'/repair', query: {type: this.appStatus.repairQueryType}});
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
      this.item = {equip_id:null, model_id:null,location:'',problem_desc:''};
      this.equip = null;
      this.model = null;
    },
    fileSelected(files) {
      console.dir(files);
      var _files = this.selectedFiles;
      var _selectedNum = _files.length;
      files.forEach(function(file, k){
        //base64
        _files[_selectedNum+k]= file.__img.src;
        //console.dir(file.__img.src);
      });
      this.selectedFiles = _files;
      this.check_if_document_upload=true
    },

  },
  data() {
    return {
      rules: [
        (val) => !!val || 'Required'
        //:rules="rules"
      ],
      item:{equip_id:null, model_id:null,location:'',problem_desc:'', files:[]},
      options:[],
      equips:[],
      equipOptions:[],
      models:[],
      modelOptions:[],
      model:null,
      equip:null,
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
