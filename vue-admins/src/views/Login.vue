<template>
    <div class="login-box">
        <div class="bgtop">
            <div class="bgshadow"></div>
        </div>
        <div class="login-container">
            <h4>用户登录</h4>
            <h5>欢迎登录后台管理系统</h5>
            <form action="">
            <label for="">
                <el-input v-model="username" placeholder="请输入账号" auto-complete="off"></el-input>
            </label>
            <label for="">
                <el-input v-model="userpwd" placeholder="请输入密码" auto-complete="off" show-password>></el-input>
            </label>
            <p id="alertMsg" v-show='alertflag'>{{alertmsg}}</p>
            <el-button type="primary" @click="gotoHome" class="loginBtn">登  录</el-button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            userpwd: '',
            alertmsg: '',
            alertflag: false
        }
    },
    methods: {
        gotoHome(){
            if(this.username!=""){
                this.alertflag=false;
                if(this.userpwd!=""){
                    this.alertflag=false;
                    this.$axios.post("/systemLogin/toLogin",this.$qs.stringify({
                        username:this.username,
                        pwd:this.userpwd
                    }))
                    .then(res=>{
                        if(res.data.status==200){
                            sessionStorage.setItem("isLogin",true);
                            this.alertflag=false;
                            // 登录后获取权限
                            this.$axios.get("/systemManager/getRoute")
                            .then(res=>{
                                this.$store.state.dataRoutes=res.data;
                                this.$router.push({ path: '/manager/staff' });
                            }) 
                        }else{
                            this.alertmsg="！用户名或密码错误";
                            this.alertflag=true;
                        }
                    })
                }else{
                    this.alertmsg="！请输入密码";
                    this.alertflag=true;
                }
            }else{
                this.alertmsg="！请输入用户名";
                this.alertflag=true;
            }
        }
    },
    created() {
        console.log(this.$router.options.routes)
        sessionStorage.setItem("isAddRoutes",1);
    },
}
</script>

<style scoped>
    .login-box{
        position: relative;
        width: 100vw;
        height: 100vh;
    }
    .bgtop{
        width: 100vw;
        height: 50vh;
        background: url('../assets/loginbg.png') no-repeat center center;
        background-size: 100%;
    }
    .bgshadow{
        width: 100vw;
        height: 50vh;
        background: rgba(1,146,251,.8);
    }
    .login-container{
        width: 350px;
        height: 280px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        position:absolute;
        left: 50%;
        top: 50%;
        margin-left: -210px;
        margin-top: -175px;
        box-shadow: 5px 5px 5px rgba(0,0,0,.2);
    }
    .login-container h4{
        color: #0192fb;
        font-size: 22px;
        line-height: 30px;
        margin: 0;
    }
    .login-container h5{
        color: #999;
        font-size: 16px;
        line-height: 40px;
        font-weight: normal;
        margin: 0;
        margin-bottom: 20px;
    }
    .login-container label{
        display:block;
        margin-bottom: 20px;
    }
    .login-container p{
        position:absolute;
        left: 35px;
        bottom: 80px;
        color:#F56C6C;
        font-size: 12px;
    }
    .loginBtn{
        margin-top: 20px;
    }
</style>