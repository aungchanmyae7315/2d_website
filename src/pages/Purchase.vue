<template>
  <q-page  padding>
    <div>
      <h5 class="q-ma-none q-pa-none q-display-1 q-display-1-opacity text-center">Add Purchase Reguisition</h5>
      <div class="edit">
        
        <q-select
          :options="[
            { label: 'English (US)',         value: 'en-us' },
            { label: 'Chinese (Simplified)', value: 'zh-hans' },
          ]"
          :value="selectedDept"
          label="申請部門"
        />
        

  <div class="q-pa-md">
    <div class="row " v-for="item in items" :key="item.id">
      <div class="col-12">
      <q-select
        fill-input
        v-model="item.item_id"
        use-input
        :options="options"
        @filter="filterFn"
        label="申購品名 & 規格"
        :value="selectedItem"
        @input="onSelectedItem"
        style="height:50px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>

      </q-select>
       
      </div>
      <div class="col-4">
        <q-input
          v-model="item.qty"
          type="number"
          label="QTY"
          @blur="reCalc"
          @focus.native="$event.target.select()" 
        >
        </q-input>
      </div>
      <div class="col-4">
        <q-input
          v-model="item.unit_price"
          type="number"
          label="Unit Price"
          @blur="reCalc"
          @focus="$event.target.select()" 
        >
        </q-input>
      </div>
      <div class="col-4">
        <q-input
          v-model="item.sub_total"
          type="number"
          label="Sub Total"
          readonly
        >
        </q-input>
      </div>
    </div>

  </div>  
  <div>
    <div class="text-h5 text-right">
      Total:
      <span>{{total}}</span>
    </div>
  </div>
        <q-input
          v-model="note"
          type="textarea"
          :placeholder="[[lang.purchaseUsage]]"
        >
          <template v-slot:prepend>
            <q-icon name="far fa-comment" />
          </template>
        </q-input>
        <q-btn color='primary' class='full-width' @click="publish()">Allow Gouout</q-btn>
      </div>
      <div class="preview" v-html="markdown">
      </div>
    </div>


    
  </q-page>
</template>

<script>
import marked from 'marked';
import qs from 'qs';
import { date } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
const stringOptions = [
            { label: 'English (US)',         value: "1" },
            { label: 'Chinese (Simplified)', value: "2" },
          ]

export default {
  computed: {
    markdown() {
      return marked(this.note, { sanitize: true });
    },
    ...mapGetters({
      user: 'login/user',
      lang: 'core/getLang'
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
    onSelectedItem(v){
      console.dir(this.items);
    },
    reCalc(v){
      //console.dir(v);
      //console.dir(v.target.value);
      //console.dir(this.items);
      let total = 0;
      this.items.forEach(function(item, key){
        item.sub_total = item.qty*item.unit_price;
        //console.dir(item.sub_total);
        total += item.sub_total;
      });
      this.total = total;
    },
    filterFn (val, update, abort) {
      update(() => {
        //console.dir(val);
        const needle = val.toLowerCase()
        this.options = stringOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    publish() {
      // Retrieve data from the component.
      const { card_number, allow_time, note } = this;
      // console.dir(allow_time);
      // console.dir(this.datetime);
      // return;
      // Basic form validation.
      if (!card_number) {
        this.$q.notify({ type: 'negative', message: 'Card number cannot be empty.' });
        return;
      }

      // Becasue we're using the Quasar plugin for Axios,
      // we have the ability to access it as this.$axios.
      const params = {
        card_number: card_number,
        allow_time: allow_time,
        note: note
      };
      this.$axios.post('/dev/user/goout', qs.stringify(params))
      .then((response) => {
        console.dir("----");
        console.dir(response.data);
        if (response.data.success){
          this.$q.notify({ type: 'positive', color:'green-9', message: 'Your post has been allowed.' });
          this.$router.push({path:'/goout-list', query: {type: 'new'}});
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
  },
  data() {
    return {
      item_id:"",
      selectedDept:null,
      selectedItem:null,
      qty:null,
      unit_price: null,
      sub_total: null,
      allow_time: '',
      note: '',
      total: 0,
      items:[{'item_id':null,'qty':0, 'unit_price':0, "sub_total":0}, {'item_id':null,'qty':0, 'unit_price':0, "sub_total":0}],
      rules: [
        (val) => !!val || 'Date is required'
        //:rules="rules"
      ],
      options: stringOptions,
      // dateProxy:null,
      // datetime:'',
      // date:'',
      // time:''
      // date:()=>{
      //           let timeStamp = Date.now();
      //   let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
      //    return formattedString;
      // }
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
