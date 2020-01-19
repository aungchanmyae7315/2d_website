<template>
  <q-page padding>
    <form @submit.prevent='loginStep1()'>
      <h4 class="text-center">Eslite Garment Co.,Ltd.</h4>
      <q-field icon='person'>
        <q-input v-model='account' placeholder="Phone">
          <template v-slot:prepend>
            <q-icon name="phone" />
          </template>
        </q-input>
      </q-field>
      <!--
      <q-field icon='vpn_key'>
        <q-input v-model='password' float-label='Password' type='password' />
      </q-field>
      -->
      
      <q-btn color='primary' class="full-width" :loading="loading" type="submit">Login</q-btn>
    </form>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import auth from '../auth';
import lang from '../i18n/en-us';

export default {
  methods: {
    ...mapActions('login', [
      'setLoginPhone'
    ]),
    loginStep1(){
      // Quasar allows us to add loading spinners to our buttons
      // so we bind the loading property to the attribute on q-btn.
      this.loading = true;
      // The login method returns a promise.
      this.setLoginPhone(this.account);
      auth.loginStep1(this.account).then(res => {
        this.loading = false;
        console.dir(res);
        // If 'then' returns anything it means there's an error
        // and we can't log the user in.
        if (!res.success) {
          // We use Quasar's notify plugin to display these neat
          // notifications.
          this.$q.notify({ type: 'negative', message: res.message });
          return;
        }

        // Otherwise we let the user know they've been logged in...
        //this.$q.notify({ type: 'positive', message: 'You have been successfully logged in.' });

        // ...and redirect them to the index.
        this.$router.push('loginStep2');
      });
    },
    login() {
      // Quasar allows us to add loading spinners to our buttons
      // so we bind the loading property to the attribute on q-btn.
      this.loading = true;

      // The login method returns a promise.
      auth.login(this.account, this.password).then(err => {
        this.loading = false;

        // If 'then' returns anything it means there's an error
        // and we can't log the user in.
        if (err) {
          // We use Quasar's notify plugin to display these neat
          // notifications.
          this.$q.notify({ type: 'negative', message: err });
          return;
        }

        // Otherwise we let the user know they've been logged in...
        this.$q.notify({ type: 'positive', message: 'You have been successfully logged in.' });

        // ...and redirect them to the index.
        this.$router.push('/home');
      });
    },
  },
  data() {
    return {
      account: '09450059852',
      password: '',
      loading: false,
      auth,
      lang
    };
  },
};
</script>

<style lang='stylus' scoped>
button
  margin-top 3em
</style>
