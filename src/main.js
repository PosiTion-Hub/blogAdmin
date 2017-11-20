import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `${localStorage.getItem('token')}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
});

axios.interceptors.response.use(function (response) {
    if(response.data.status == 2){
    	localStorage.removeItem('ms_username')
    	localStorage.removeItem('token')
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
});
router.beforeEach ((to, from, next) => {
	if (to.path === '/login') {
	  	next()
	} else {
	  	if(localStorage.getItem('token')){
	  		next()
	  	}else{
	  		next({name: 'login'})
	  	}
	}
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');