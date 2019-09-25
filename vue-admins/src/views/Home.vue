<template>
    <el-container>
    <el-header style="height: 80px;">
        <h1>欢迎登录后台管理系统！</h1>
        <el-dropdown>
        <span class="el-dropdown-link">
            设置<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人资料</el-dropdown-item>
            <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
    </el-header>
    <el-container>
        <!-- 权限管理系统 -->
        <el-aside width="200px">
            <el-scrollbar style="height:100%">
            <el-col :span="12" class="aside">
                <el-menu
                :router=true
                :unique-opened=true
                class="el-menu-vertical-demo"
                background-color="#2e4054"
                text-color="#fff"
                active-text-color="#ffd04b"
                :default-active="$route.path"
                v-for="(item,i) in menuList"
                :key="i">
                <el-submenu :index=String(item.menu_url)>
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>{{item.menu_name}}</span>
                    </template>
                    <!-- <el-menu-item>{{item.child[i].child.length}}</el-menu-item> -->
                    <div v-show="!item.child[i].child.length==0" v-for="(zitem,j) in item.child" :key="'q'+j">
                        <el-submenu :index=String(zitem.menu_url)>
                        <template slot="title">{{zitem.menu_name}}</template>
                        <div v-for="(zzitem,k) in zitem.child" :key="'w'+k">
                            <el-menu-item :index=String(zzitem.menu_url)>{{zzitem.menu_name}}</el-menu-item>
                        </div>
                        </el-submenu>
                    </div>
                    
                    <div v-show="item.child[i].child.length==0" v-for="(xitem,m) in item.child" :key="'e'+m">
                        <el-menu-item :index=String(xitem.menu_url)>{{xitem.menu_name}}</el-menu-item>
                    </div>
                </el-submenu>
                </el-menu>
            </el-col>
            </el-scrollbar>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            menuList:[]
        }
    },
    methods: {
        logout() {
            this.$axios.get("/systemLogin/logout")
            .then(res=>{
                if(res.data.status==200){
                    sessionStorage.clear();
                    this.$router.push({ path: '/' });
                }
            })
        },
        getPath() {
            console.log(this.$route.path)
        }
    },
    created(){
        // 进入页面判断用户是否登录
        if(!sessionStorage.getItem("isLogin")){
            this.$router.push({ path: '/' });
        }
        // 请求数据
        this.$axios.get("/systemManager/getTree")
        .then(res=>{
            this.menuList=res.data;
        })
    },
    watch: {
        '$route':"getPath"
    }
}
</script>

<style scoped>
    .el-container{
        width: 100vw;
        height: 100vh;
    }
    .el-header {
        width: 100vw;
        background-color: #0896ba;
        color: #333;
        overflow: hidden;
    }
    .el-scrollbar{
        overflow-x: hidden;
    }
    .el-header h1{
        padding: 0 20px;
        line-height: 80px;
        font-size: 20px;
        color: #fff;
        float: left;
    }
    .el-header ul{
        list-style: none;
        float: left;
        color:#eee;
    }
    .el-header li{
        float: left;
        line-height: 80px;
        padding: 0 30px;
    }
    .active{
        background-color: #0783a3;
        color:#fff;
    }
    .el-aside {
        background-color: #2e4054;
    }
    .el-main {
        background-color: #fff;
        color: #333;
        height:100%;
    }
    .aside{
        width: 200px;
        text-align: left;
    }
    .el-menu-item,.el-submenu{
        width: 200px;
    }
    .el-dropdown{
        float:right;
        margin-top: 25px;
    }
    .el-dropdown-link{
        display:inline-block;
        width: 80px;
        line-height: 30px;
        text-align: center;
        background:#fff;
        border-radius: 4px;
    }
</style>