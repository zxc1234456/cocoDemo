// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./index.css";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import qs from 'qs';
// import Router from 'vue-router'

Vue.prototype.$qs=qs;

Vue.config.productionTip = false;
Vue.use(ElementUI);

import ajax from "./utils/ajax";
Vue.prototype.$axios = ajax ;  // this.$axios 指向 axios 

import addPersonShadow from "@/components/addPersonShadow.vue";
import selfBuiltShadow from "@/components/selfBuiltShadow.vue";
Vue.component("addPersonShadow",addPersonShadow);
Vue.component("selfBuiltShadow",selfBuiltShadow);

// 配置动态路由
router.beforeEach((to, from, next) => {
  if(sessionStorage.getItem("isLogin")){
    if(sessionStorage.getItem("isAddRoutes")==1){
      store.dispatch('getRoutes');
      console.log(router.options.routes);
      sessionStorage.setItem("isAddRoutes",0);
      next({ ...to, replace: true });
    }
    next();
  }else{
    // 这里不判断会进入死循环
    if(to.path=='/'){
      next();
    }else{
      next({path:'/'}) 
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //使用store
  components: { App },
  template: '<App/>'
})
