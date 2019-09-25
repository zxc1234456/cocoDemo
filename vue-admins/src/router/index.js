import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import NotFound from '@/views/NotFound'
import Home from '@/views/Home.vue'

// 权限管理系统所有路由
import Menu from '@/views/nav1/Menu.vue'
import Department from '@/views/nav1/Department.vue'
import Staff from '@/views/nav1/Staff.vue'
import Job from '@/views/nav1/Job.vue'

// 信用管理系统所有路由
// import Following from '@/views/nav2/Following.vue'
// import Expired from '@/views/nav2/Expired.vue'
// import Signed from '@/views/nav2/Signed.vue'
// import Developing from '@/views/nav2/Developing.vue'
// import Tobeassigned from '@/views/nav2/Tobeassigned.vue'
// import Unpaid from '@/views/nav2/Unpaid.vue'
// import Paid from '@/views/nav2/Paid.vue'
// import Preevaluation from '@/views/nav2/Preevaluation.vue'
// import Materials from '@/views/nav2/Materials.vue'
// import Trustmsg from '@/views/nav2/Trustmsg.vue'
// import Publish from '@/views/nav2/Publish.vue'
// import Business from '@/views/nav2/Business.vue'
// import Recruitment from '@/views/nav2/Recruitment.vue'
// import VueRouter from 'vue-router'

Vue.use(Router)
// 防止点击同一路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound,
    },
    // {
    //   path: '/manager',
    //   component: Home,
    //   name: '权限管理',
    //   // iconCls: 'el-icon-message',//图标样式class
    //   children: [
    //     { path: '/manager/staff', component: Staff, name: '人员管理' },
    //     { path: '/manager/menu', component: Menu, name: '菜单维护' },
    //     { path: '/manager/department', component: Department, name: '部门维护' },
    //     { path: '/manager/job', component: Job, name: '岗位管理' }
    //   ]
    // },
    // {
    //   path: '/credit',
    //   component: Home,
    //   name: '信用管理平台',
    //   children: [
    //     { path: '/credit/following', component: Following, name: '跟进中客户' },
    //     { path: '/credit/expired', component: Expired, name: '临期客户' },
    //     { path: '/credit/signed', component: Signed, name: '成交客户' },
    //     { path: '/credit/developing', component: Developing, name: '待挖掘客户' },
    //     { path: '/credit/tobeassigned', component: Tobeassigned, name: '待分配客户' },
    //     { path: '/credit/unpaid', component: Unpaid, name: '未到款' },
    //     { path: '/credit/paid', component: Paid, name: '已到款' },
    //     { path: '/credit/preevaluation', component: Preevaluation, name: '预评审核' },
    //     { path: '/credit/materials', component: Materials, name: '清单资料审核' },
    //     { path: '/credit/trustmsg', component: Trustmsg, name: '信用信息' },
    //     { path: '/credit/publish', component: Publish, name: '资讯发布' },
    //     { path: '/credit/business', component: Business, name: '企业新闻审核' },
    //     { path: '/credit/recruitment', component: Recruitment, name: '采招行业信用' }
    //   ]
    // },
    // {
    //   path: '*',
    //   redirect: { path: '/404' }
    // }
  ]
})

