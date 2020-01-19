import axios from 'axios';
import qs from 'qs';

export default {
  user: null,
  getUser() {
    return this.user;
  },
  loggedIn() {
    //console.dir(this.user);
    return this.user !== null;
  },
  authorize(token) {
    console.dir(token);
    return axios.get('/user/authorize', {
      headers: {
        Authorization: token,
      },
    }).then(res => {
      //localStorage.setItem('Authorization', `Bearer: ${res.data.access_token}`);
      localStorage.setItem('Authorization', `${res.data.access_token}`);
      this.user = res.data;
      return null;
    }).catch(err => console.log(token, err));
  },
  loginStep1(phone) {
    const params = {
      phone: phone
    };
    return axios.post('/dev/user/loginStep1', qs.stringify(params),
    {
      responseType:'json'
    }).then(res => {
      this.user = res.data
      console.dir("abcde");
      return res.data
    }).catch(error => error.response.data.error);
  },
  loginStep2(phone, otp) {
    const params = {
      phone: phone,
      otp:otp
    };
    //console.dir(params);
    return axios.post('/dev/user/loginStep2', qs.stringify(params),
    {
      responseType:'json'
    }).then(res => {
      console.dir(res);
      localStorage.setItem('Authorization', `${res.data.data.access_token}`);
      localStorage.setItem('user', JSON.stringify(res.data.data));
      this.user = res.data;
      return res.data;
    }).catch(error => error.response.data.error);
  },
  login(name, password) {
    /*
    let params = new URLSearchParams();
        params.append('account', name );
        params.append('password', password );
    */
    const params = {
      account: name,
      password: password
    };
    return axios.post('/user/login', qs.stringify(params),
    {
      responseType:'json'
    }).then(res => {
      //console.dir(res.data);
      //var resData = JSON.parse(res.data);
      //console.dir(resData);
      localStorage.setItem('Authorization', `${res.data.access_token}`);
      this.user = res.data;
      return null;
    }).catch(error => error.response.data.error);
  },
  register(name, password) {
    const params = {
      account: name,
      password: password
    };
    return axios.post('/user/create', qs.stringify(params)).then(res => {
      localStorage.setItem('Authorization', `${res.data.access_token}`);
      this.user = res.data;
      return null;
    }).catch(error => error.response.data.error);
  },
  logout() {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('user');
    this.user = null;
  },
};
