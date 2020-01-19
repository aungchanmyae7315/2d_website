<template>
  <q-page padding>
    <form @submit.prevent='loginStep2()'>
      <h4 class="text-center">Eslite Garment Co.,Ltd. </h4>
      <q-field icon='code'>
        <q-input v-model='otp' placeholder="OTP Code">
          <template v-slot:prepend>
            <q-icon name="code" />
          </template>
        </q-input>
      </q-field>
      
      <q-btn color='primary' class="full-width" :loading="loading" type="submit">Submit</q-btn>
      
    </form>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import auth from '../auth';

export default {
  computed: {
    /*
    ...mapGetters('example', [
      'getPageTitle'
    ])
    */
    ...mapGetters({
      loginPhone: 'login/getLoginPhone'
    })

  },
  methods: {
    ...mapActions('login', [
      'setIsLogin',
      'setUser'
    ]),
    loginStep2(){
      this.loading = true;

      auth.loginStep2(this.loginPhone, this.otp).then(res => {
        this.loading = false;

        // if (!res.success) {
        //   this.$q.notify({ type: 'negative', message: res.message });
        //   return;
        // }
        console.dir(res);
        this.setIsLogin(true);
        this.setUser();
        this.$q.notify({ type: 'positive', color:'green' ,message: 'You have been successfully login.' });
        this.$router.push('/home');
      });
    },
    register() {
      if (this.password !== this.repeatPassword) {
        this.$q.notify({ type: 'negative', message: 'Passwords do not match.' });
        return;
      }

      this.loading = true;

      auth.register(this.username, this.password).then(err => {
        this.loading = false;

        if (err) {
          this.$q.notify({ type: 'negative', message: err });
          return;
        }

        this.$q.notify({ type: 'positive', message: 'You have been successfully registered.' });
        this.$router.push('/');
      });
    },
  },
  data() {
    return {
      otp:'',
      loading: false,
      auth,
    };
  },
};
</script>

<style lang='stylus' scoped>
button
  margin-top 3em
</style>
