
import Vue from 'vue';
import Vuex from 'vuex';
import Home from '@/views/Home.vue';
import router from '../router'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin:false,
        dataRoutes: []
    },
    actions: {
        getRoutes(context){
            context.commit("getRoutes")
        }
    },
    mutations: {
        getRoutes(state){
            let routes=filterRouter(this.state.dataRoutes);
            router.options.routes=routes;
            router.addRoutes(routes);

            function filterRouter(routers) { // 遍历后台传来的路由字符串，转换为组件对象
            const accessedRouters = routers.filter(route => {
                if (route.component) {
                    if (route.component === 'Home') { // Home组件特殊处理
                        route.component = Home
                    } else {
                        route.component = _import(route.component)
                    }
                }
                if (route.children && route.children.length) {
                    route.children = filterRouter(route.children)
                }
                return true
            })
            return accessedRouters
            }
        
            function _import (file) {
                if(file=='Menu' || file=='Department' || file=='Staff' || file=='Job'){
                    return () => import('@/views/nav1/' + file + '.vue')
                }else{
                    return () => import('@/views/nav2/' + file + '.vue')
                }  
            }
        }
    }
})


 