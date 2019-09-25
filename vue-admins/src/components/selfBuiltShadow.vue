<template>
    <div class="shadow" v-show="flag">
        <el-form
        :model="ruleForm" 
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm" 
        @submit.native.prevent>
            <el-scrollbar style="height:100%">
            <div class="base-Msg">
                <h4>北京国信科技有限公司</h4>
                <p><span>法人代表：</span>王某某</p>
                <p><span>地区：</span>北京</p>
                <p><span>联系电话：</span>12834447777</p>
                <p><span>统一社会信用代码：</span>123124123213123213123123123</p>
                <p><span>经营范围：</span>技术开发、技术服务</p>
                <h4>自建客户</h4>
            </div>
            <el-form-item label="联系人" prop="contact">
                <el-input v-model="ruleForm.contact" class="contactspan"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
                <el-input v-model="ruleForm.phone" class="phonespan"></el-input>
                <el-button>发送密码</el-button>
            </el-form-item>
            <el-form-item label="跟进记录" prop="record">
                <el-input 
                v-model="ruleForm.record" type="textarea"
                :autosize="{ minRows: 4, maxRows: 4}"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
            </el-scrollbar>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flag:false,
            ruleForm: {
                contact: '',
                phone: '',
                record: ''
            },
            rules:{
                contact:[
                    {required:true, message:'请输入姓名', trigger:'blur'}
                ],
                phone:[
                    {required:true, message:'请输入电话号码', trigger:'change'},
                    {min:11, max:11, message:'请输入正确手机号', trigger:'blur'}
                ],
                record:[
                    {required:true, message:'请输入跟进记录', trigger:'blur'}
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.flag=false;
        },
        cancel() {
            this.flag=false;
        }
    }
}
</script>

<style scoped>
    .shadow{
        position:fixed;
        left: 0;
        top: 0;
        width:100vw;
        height: 100vh;
        background-color: rgba(0,0,0,.5);
        z-index:9;
    }
    .el-form{
        width: 600px;
        height: 440px;
        padding: 20px;
        background-color: #fff;
        border-radius: 6px;
        position:absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin:auto;
        text-align: left;
    }
    .el-scrollbar{
        overflow-x: hidden;
    }
    .contactspan{
        width: 400px;
    }
    .phonespan{
        width: 300px;
    }
    .base-Msg h4{
        text-align: center;
        color: #333;
        line-height: 60px;
        font-size: 16px;
    }
    .base-Msg p{
        color: #333;
        line-height: 40px;
        font-size: 14px;
        padding-left: 20px;
    }
    .base-Msg p span{
        color: #606266;
    }
</style>