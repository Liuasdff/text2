  // The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import  'default-passive-events';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import $ from 'jquery'  // 配置了全局  这里可以不用引用
import VueResource from 'vue-resource';
Vue.use(VueResource);
import Vuex from 'vuex';
Vue.use(Vuex);
import Chart from "../static/Chart.js" ;
// import mywindow from "../static/mywindow.js" ;
import  "mint-ui/lib/style.css";
// import  "tailwindcss/dist/tailwind.css";
// import mt from "mint-ui";
// import "../static/mui.js"; //全局引用 mui JS 如果要全局引用mui css 需要在index.html 中用<link herf=""> 引用

window.search = true
// window.token = {"Authorization":"Token 5b0214f47272665d571986a3ca300eb5339ff8f4"}
window.URL = "https://my.opalstack.live/api/v1"
Vue.prototype.chStatus={'READY':'正常','PENDING_CREATE':'在创建中','PENDING_UPDATE':'在更新中','PENDING_DELETE':'在删除中','PENDING_INSTALL':'在安装中','PENDING_START':'在启动中',}
Vue.prototype.Status={'READY':'Ready','PENDING_CREATE':'Pending Create','PENDING_UPDATE':'Pending Update','PENDING_DELETE':'Pending Delete','PENDING_INSTALL':'Pending Install','PENDING_START':'Pending Start',}
var store = new Vuex.Store({
    state:{
      "url":"http://192.168.3.9:8000",
    },
})

Vue.prototype.global_1 = "global_1"
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data:{
    "a":"x"
  },
  mode: "history",
  router,
  store,
  render:h=>h(App),
  // components: { App },
  // template: '<App/>'
})
