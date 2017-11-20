import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);




export default new Router({
	hashbang: false,
	history: true,
	mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login',
            name:'login'
        },
        {
            path: '/readme',
            name: 'readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/ariticleList',
                    component: resolve => require(['../components/page/ariticleList.vue'], resolve)
                },
                {
                    path: '/ariticleEdit',
                    component: resolve => require(['../components/page/ariticleEdit.vue'], resolve)
                },{
                    path: '/ariticleEdit/:id',
                    component: resolve => require(['../components/page/ariticleEdit.vue'], resolve)
                },
                {
                    path: '/ariticleAdd',
                    component: resolve => require(['../components/page/ariticleAdd.vue'], resolve)
                },
//               {
//                  path: '/classIfy',
//                  component: resolve => require(['../components/page/classIfySetting.vue'], resolve)
//              },
                {
                    path: '/tagify',
                    component: resolve => require(['../components/page/tagSetting.vue'], resolve)
                },
                 {
                    path: '/setting',
                    component: resolve => require(['../components/page/setting.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
