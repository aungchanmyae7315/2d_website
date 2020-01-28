<template>
    <main class="sign_up_main">
      
    <form @submit.prevent='loginStep1()'>
           <img src="../assets/images/login_page/login_bg.png" class="login_bg">
          <div class="main_login_page">
              <div class="language">
              <ul>
                <li>
                  <a href="">ဇော်ဂျီ</a>
                </li>
                <li>
                  <a href="">ယူနီကုတ်</a>
                </li>
                <li>
                  <a href="">English</a>
                </li>
                <li>
                  <a href="">Chinese</a>
                </li>
              </ul>
          </div>


        <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
        <q-input
          ref="phone"
          v-model="phone"
          label="Phone *"
          hint="Phone and Sure Phone"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']">
          <template v-slot:prepend>
            <q-icon name="phone" />
          </template>
        </q-input>
         <q-input
          ref="password"
          v-model="password"
          label="Password *"
          hint="Please Enter You Password"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']">
          <template v-slot:prepend>
            <q-icon name="no_encryption" />
          </template>
        </q-input>
       
        <div>
          <q-btn label="Submit" type="submit" class="login_btn full-width"  ></q-btn>

         <!-- <q-btn label="Prompt" color="primary" @click="prompt = true" ></q-btn> -->
         
           <q-btn class="forget_password" flat label="Forget Password ?"  @click="prompt = true" ></q-btn>

   
        </div>
      </form>


        <h6>Or</h6>
        <div class="btn_group_sig">
            <q-btn class="skip_btn" @click="backhome()" rounded  label="Skip" ></q-btn>
          <q-btn class="sign_up_btn" to="/sign_up"  rounded  label="Sign Up" ></q-btn>
        </div>
         

              <q-dialog v-model="prompt" persistent>
                <q-card style="min-width: 350px">
                  <q-card-section>
                    <div class="text-h6">Your email</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <q-input dense v-model="email" autofocus @keyup.enter="prompt = false" ></q-input>
                  </q-card-section>

                  <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup ></q-btn>
                    <q-btn flat label="Add address" v-close-popup ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-dialog>


         </div>
        
      
     
        
        

    
     
    </form>
    
    </main>
 </template>
<script>
import { mapGetters, mapActions } from 'vuex'
import auth from '../auth';
import lang from '../i18n/en-us';

export default {
     data() {
    return {
        phone: null,
        password: null,
        prompt: false,
        email: '',
        loading: false,
      // auth,
      // lang
    };
  },
  // methods: {
    // ...mapActions('login', [
    //   'setLoginPhone'
    // ]),
    // loginStep1(){
    //   // Quasar allows us to add loading spinners to our buttons
    //   // so we bind the loading property to the attribute on q-btn.
    //   this.loading = true;
    //   // The login method returns a promise.
    //   this.setLoginPhone(this.account);
    //   auth.loginStep1(this.account).then(res => {
    //     this.loading = false;
    //     console.dir(res);
    //     // If 'then' returns anything it means there's an error
    //     // and we can't log the user in.
    //     if (!res.success) {
    //       // We use Quasar's notify plugin to display these neat
    //       // notifications.
    //       this.$q.notify({ type: 'negative', message: res.message });
    //       return;
    //     }

    //     // Otherwise we let the user know they've been logged in...
    //     //this.$q.notify({ type: 'positive', message: 'You have been successfully logged in.' });

    //     // ...and redirect them to the index.
    //     this.$router.push('loginStep2');
    //   });
    // },
    // login() {
    //   // Quasar allows us to add loading spinners to our buttons
    //   // so we bind the loading property to the attribute on q-btn.
    //   this.loading = true;

    //   // The login method returns a promise.
    //   auth.login(this.account, this.password).then(err => {
    //     this.loading = false;

    //     // If 'then' returns anything it means there's an error
    //     // and we can't log the user in.
    //     if (err) {
    //       // We use Quasar's notify plugin to display these neat
    //       // notifications.
    //       this.$q.notify({ type: 'negative', message: err });
    //       return;
    //     }

    //     // Otherwise we let the user know they've been logged in...
    //     this.$q.notify({ type: 'positive', message: 'You have been successfully logged in.' });

    //     // ...and redirect them to the index.
    //     this.$router.push('/home');
    //   });
    // },
  // },
  methods: {
      backhome() {
         
         this.loading = true;
          this.$router.push('/home');
      },
    onSubmit () {
      this.$refs.phone.validate()
       this.$refs.password.validate()
      

      if (this.$refs.phone.hasError || this.$refs.password.hasError ) {
        this.formHasError = true
      }
      else {
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Submitted'
        })
      }
    },

    // onReset () {
    //   this.phone = null
   

    //   this.$refs.phone.resetValidation()
     
    // }
  },
 
};
</script>

<style lang='stylus'>

  
  .login_bg {
    max-width:414px;
    width:100%;
  }
  .main_login_page {
    padding:0 30px;
    text-align:center;
    margin:0 auto;
  }
  .language {
    text-align:center;
  }
  ul {
    padding:0;
    margin:0;
    text-align:center;
    display :inline-flex;

  }
  ul li {
    list-style :none;
    display :block;
    padding:15px;
  }
  ul li a {
    text-decoration :none;
  }
  .q-input {
    max-width:414px;
    width:100%;
    display :block;
  }
  .login_btn {
    background-color :#57A11E;
    border-radius : 22px;
    padding:5px;
    color:#fff;
    font-weight :bold;
    margin:40px auto;
  }
  .forget_password {
    text-decoration :none;
    color:#57A11E;
  }
   h6        {
    color:#BDC5BE;
    font-family:'Oswald';
    font-weight:700;
    position:relative;  
    margin: 80px auto 20px auto;
    font-size: 16px;
    line-height: 15px;
    width: 282px;
}

h6:before, h6:after {
  background:#BDC5BE;
  content:"";
  display:block;
  height:1px;
  position:absolute;
  width:125px;
}

h6:before  {  
  left:0;
  top:9px;
  border-radius: 90px 0 0 90px;
  -moz-border-radius: 90px 0 0 90px;
  -webkit-border-radius: 90px 0 0 90px;
}

h6:after   {
  right:0;
  top:9px;
  border-radius: 0 90px 90px 0;
  -moz-border-radius: 0 90px 90px 0;
  -webkit-border-radius:  0 90px 90px 0;
}
.btn_group_sig {
  display :inline-flex;
}
.skip_btn {
  background-color:#00000029;
  text-transform :capitalize;
  margin:20px;
   padding:0 12px;
}
.sign_up_btn {
   background-color:#EBB811;
   color:#fff;
  text-transform :capitalize;
  margin:20px;
  padding:0 12px;
}
</style>
