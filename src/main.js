// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router';

import iView from 'iview';

// import css component
import 'iview/dist/styles/iview.css';
import './assets/css/font.css';
import './assets/css/base.scss';
import Axios from 'axios';
import Vuex from 'vuex'

Vue.use(iView);
Vue.use(Vuex);

Vue.config.productionTip = false

let CONFIG = {
  apiDomain: 'api', // http://192.168.56.62:8080 http://dev-api-dsp.com:8081
  token: 'Bearer ' + localStorage['token'] || ''
}
Vue.prototype.$http = Axios.create({
  baseURL: CONFIG.apiDomain,
  timeout: 6000,
  headers: {
    'Authorization': CONFIG.token,
    'X-Requested-With': 'XMLHttpRequest'
  },
  validateStatus: function (status) {
    if (status >= 400) {
    //   router.push({path: '/login'});
      return false
    }
    return status >= 200 && status < 300; // default
    },
    transformResponse: [function(res) {
        let data = JSON.parse(res);
        let url = window.location.href;
            if (data.errorCode == 50000) {
                window.location.href = `${data.loginUrl}?redirect=${url}`;
            // Vue.prototype.$Modal.info({
            //     title: '提示',
            //     content: data.errorMsg,
            //     onOk: () => {
            //         window.location.href = `${data.loginUrl}?redirect=${url}`;
            //     }
            // });
        }
        return data;
    }]
})

Vue.prototype.CONFIG = CONFIG

// Vue.prototype.$http.get('/isp-kongming/basic/getBusinessType',{}).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })
//
// Axios.get('/api/isp-kongming/basic/getBusinessType').then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })


/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
