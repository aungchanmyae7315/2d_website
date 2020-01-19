<template>
    
    <q-card inline>
      <div class="text-center">
        <!--
        <img src="~assets/no-user.jpg" style="max-width:100%;height:230px;">
        <div  :style="{'background-image':'url('+backgroundUrl+');'}">
        :style="{ backgroundImage: 'url(' + require('@/assets/imgs/bg'+backgroundId+'.png') + ')' }"
        -->
        
        <div class="detail-avatar" :style="{ backgroundImage: 'url(' + require('../assets/no-user.jpg') + ')' }"></div>
        
        <div class="text-h6">{{list.full_name}} ({{list.card_number}})</div>
      </div>

    <q-list>
      <q-item>
        <q-item-section avatar>
          <img style="width:30px;" src="~assets/no-user.jpg">
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ list.created_user }}</q-item-label>
          <q-item-label caption lines="1">{{ list.created_at }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <i class="far fa-fw fa-sticky-note q-mr-sm"></i>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <img style="width:30px;" src="~assets/no-user.jpg">
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ list.allow_user }}</q-item-label>
          <q-item-label caption lines="1">{{ list.allow_at }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <i class="fas fa-fw fa-check q-mr-sm"></i>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <img style="width:30px;" src="~assets/no-user.jpg">
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ list.security_user }}</q-item-label>
          <q-item-label caption lines="1">{{ list.security_at }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <i class="fas fa-fw fa-shield-alt q-mr-sm"></i>
        </q-item-section>
      </q-item>

    </q-list>


        <p class="text-faded">{{list.note}}</p>
        <q-separator />

      <div v-if="!list.allow_user && this.list.user_id !== this.$store.state.login.user.user_id">
        <q-separator />
        <q-card-actions>
          <q-btn flat color="red" class="full-width" icon="check" label="Confirm Goout" @click="confirm('allow', list.id)" />
        </q-card-actions>
      </div>
      <div v-if="list.allow_user && !list.security_user_id && this.list.user_id !== this.$store.state.login.user.user_id">
        <q-separator />
        <q-card-actions>
          <q-btn flat color="red" class="full-width" icon="shield" label="Security Confirm" @click="confirm('security', list.id)" />
        </q-card-actions>
      </div>
      <div>
        <q-separator />
        <q-card-actions>
          <q-btn flat color="red" class="full-width" icon="close" label="Close" v-close-popup />
        </q-card-actions>
      </div>
    </q-card>
</template>

<script>
import marked from 'marked';
import qs from 'qs';
export default {
  props: ['item'],
  mounted() {

  },
  watch: {

  },
  components: {

  },
  computed: {
    isOwner(){
      return this.list === this.$store.state.login.user.user_id
    },
    list:{
      get() {
        if (this.listProxy === null){
          return this.item;
        }
        else{
          return this.listProxy;
        }
      },
      set(val){
        //console.dir(val);
        this.listProxy = val;
      }
    }
  },
  methods: {
    confirm(type, id){
      const params = {
        id: id,
        type: type
      };
      this.$axios.post('/dev/user/gooutConfirm/', qs.stringify(params))
      .then((response) => {
        //console.dir(response.data);
        if (response.data.success){
          this.list = response.data.data;
          this.$emit('updateLists', this.list);
        }
        else{
          this.$q.notify({ type: 'negative', message: response.data.message });
        }
      }).catch(error => {
        console.dir(error.response);
        if (error.response.status == 401){
          this.$router.push('/login');
        }
      });
    },
  },
  data() {
    return {
      //isShow:true,
      //innerIsShow:false,
      listProxy:null
    };
  },
};
</script>

<style lang="stylus" scoped>

.detail-avatar
  width:100%;
  height:230px;
  display: block;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
