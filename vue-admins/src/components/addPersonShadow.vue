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
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="ruleForm.sex">
                <el-radio label=1>男</el-radio>
                <el-radio label=2>女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
                <span id="isRegister" v-show="registerFlag">该号码已被注册过</span>
            </el-form-item>
            <!-- 新增时，可自行设置密码  保存时，只能恢复默认密码 -->
            <el-form-item label="密码设置" prop="pwd" v-if="saveFlag">
                <el-autocomplete
                popper-class="my-autocomplete"
                v-model="ruleForm.pwd"
                :fetch-suggestions="querySearch"
                placeholder="请输入密码">
                <i
                    class="el-icon-edit el-input__icon"
                    slot="suffix"
                    @click="handleIconClick">
                </i>
                <template slot-scope="{ item }">
                    <div class="name">{{ item.value }}</div>
                    <span class="addr">{{ item.address }}</span>
                </template>
                </el-autocomplete>
            </el-form-item>
            <el-form-item label="密码设置" prop="pwd1" v-else>
                <el-checkbox v-model="ruleForm.pwd1" label="1" name="pwd1">重置密码</el-checkbox>
            </el-form-item>    

            <el-form-item label="所属部门" prop="department">
            <el-select v-model="ruleForm.department" placeholder="请选择部门">
                <el-option
                v-for="(item,i) in options.list"
                :key="i"
                :label="item.department"
                :value="item.id">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="权限分配" prop="menu">
                <div v-for="(item,i) in checkboxs" :key="i">
                    <div v-show="item.child[i].child.length==0">
                        <span>{{item.menu_name}}</span>
                        <el-checkbox-group v-model="ruleForm.menu">
                            <el-checkbox v-for="(zitem,j) in item.child" :label="zitem.mid" :key="j">{{zitem.menu_name}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    
                    <div v-for="(zzitem,k) in item.child" :key="k" v-show="item.child[i].child.length!=0">
                        <span>{{item.menu_name+' / '+zzitem.menu_name}}</span><br>
                        <el-checkbox-group v-model="ruleForm.menu">
                        <el-checkbox v-for="(zzzitem,l) in zzitem.child" :label="zzzitem.mid" :key="l">{{zzzitem.menu_name}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">{{submitButton}}</el-button>
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
            checkAll: false,
            isIndeterminate: true,
            updateId:'',
            registerFlag:false,
            saveFlag:true,
            submitButton:'新增',
            checkboxs:[],
            options: {},
            restaurants: [],
            flag:false,
            ruleForm: {
                name: '',
                sex: '',
                phone: '',
                pwd:'',
                pwd1:'',
                department:'',
                menu: []
            },
            rules:{
                name:[
                    {required:true, message:'请输入姓名', trigger:'blur'},
                    // {min:3, max:5, message:'长度在3-5个字符', trigger:'blur'}
                ],
                sex:[
                    {required:true, message:'请勾选性别', trigger:'change'}
                ],
                phone:[
                    {required:true, message:'请输入电话号码', trigger:'change'},
                    {min:11, max:11, message:'请输入正确手机号', trigger:'blur'}
                ],
                pwd:[
                    {required:true, message:'请设置密码', trigger:'change'}
                ],
                department:[
                    {required:true, message:'请选择所属部门', trigger:'change'}
                ],
                menu:[
                    { type: 'array', message: '请至少选择一个权限', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                let arr=[];
                // 新增弹框隐藏
                this.flag=false;
                // 调用父组件方法，刷新列表
                this.$parent.refreshTable();
                // 新增员工信息的接口
                if(!this.registerFlag && this.saveFlag){
                        this.$axios.post("/systemUser/CreateUser",this.$qs.stringify({
                        username:this.ruleForm.name,
                        sex:this.ruleForm.sex,
                        phone:this.ruleForm.phone,
                        pwd:this.ruleForm.pwd,
                        did:this.ruleForm.department,
                        mid:this.ruleForm.menu
                    }))
                    .then(res=>{
                        console.log(res.data)
                    });
                }
                // 编辑员工信息的接口
                if(!this.saveFlag){
                        this.$axios.post("/systemUser/UpdateUser",this.$qs.stringify({
                        id:this.updateId,
                        uersname:this.ruleForm.name,
                        sex:this.ruleForm.sex,
                        phone:this.ruleForm.phone,
                        pwd:this.ruleForm.pwd1?'1':'',
                        did:this.ruleForm.department,
                        mid:this.ruleForm.menu
                    }))
                    .then(res=>{
                        console.log(res.data)
                    });
                }
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        cancel() {
            this.flag=false;
        },
        clearMsg(formMsg) {
            // 移除表单校验结果
            this.$refs[formMsg].resetFields();
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [
                { "value": "zxcvbnnm,./123456", "address": "默认密码" },
            ]
        },
        handleIconClick(ev) {
            console.log(ev);
        }
    },
    watch: {
        // 判断手机号是否被注册过
        'ruleForm.phone' (){
            console.log(this.ruleForm.phone.length);
            if(this.ruleForm.phone.length==11){
                this.$axios.post("SystemUser/isRegester",this.$qs.stringify({
                    phone:this.ruleForm.phone
                }))
                .then(res=>{
                    if(res.data.status==401){
                        // 新增时才判断手机号是否注册过
                        if(this.submitButton=="新增"){
                            this.registerFlag=true
                        }
                    }else{
                        this.registerFlag=false
                    }
                });
            }
        }
    },
    mounted() {
        this.restaurants = this.loadAll();
    },
    created() {
        // 请求数据
        this.$axios.get("/SystemDepartment/GetDepartment")
        .then(res=>{
            this.options=res.data;
        });
        this.$axios.get("/systemUser/getUser")
        .then(res=>{
            this.checkboxs=res.data;
        })
    },
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
    .my-autocomplete li{
        line-height: normal;
        padding: 7px;
    }
    .name {
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .addr {
        font-size: 12px;
        color: #b4b4b4;
    }
    .highlighted .addr {
        color: #ddd;
    }
    .checkspan{
        display:inline-block;
        margin-right:30px;
    }
    #isRegister{
        position:absolute;
        left: 0;
        top: 30px;
        font-size: 12px;
        color:#F56C6C;
    }
</style>