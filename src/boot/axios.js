import axios from 'axios'
import {
  Loading,
  // optional!, for example below
  // with custom spinner
  QSpinnerGears
} from 'quasar'
//if (Platform.is.mobile){
//axios.defaults.baseURL = 'http://goingout.sites.com.mm/api/v1/';
//axios.defaults.baseURL = 'http://local.goingout.com/api/v1/';
//}
axios.defaults.baseURL = 'http://eslite.sites.com.mm/api/v1/';

//axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.crossDomain = true;
axios.defaults.headers.common['apikey'] = "ae9d005e43f45f0aacc32801c0656e4d";
//axios.defaults.headers.common['Access-Control-Request-Method'] = '*'

// before a request is made start the nprogress
axios.interceptors.request.use(config => {
  Loading.show();
  const token = localStorage.getItem('Authorization');
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config
})

// before a response is returned stop nprogress
axios.interceptors.response.use(response => {
  Loading.hide();
  return response
})


export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}
