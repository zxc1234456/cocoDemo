<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>人员管理</el-breadcrumb-item>
            <el-button size="mini" id="addperson" @click="addperson">新增+</el-button>
        </el-breadcrumb>
        <el-table
            :data="data1.list"
            stripe
            style="width: 100%">
            <el-table-column
            prop="name"
            label="姓名"
            width="80">
            </el-table-column>
            <el-table-column
            prop="sex"
            label="性别"
            width="60"
            :formatter="stateFormat">
            </el-table-column>
            <el-table-column
            prop="phone"
            label="电话"
            width="120">
            </el-table-column>
            <el-table-column
            prop="department"
            label="部门"
            width="120">
            </el-table-column>
            <el-table-column
            prop="parent_name"
            label="创建人"
            width="120">
            </el-table-column>
            <el-table-column label="分配权限" prop="menu">
            <template slot-scope="scope">
                <span v-for="(item,i) in scope.row.menu" :key="i">
                    <el-tag v-show="item.parent_id==0 || !item.menu_url?false:true">{{item.menu_name}}</el-tag>
                </span>
            </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.oper==1" size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button v-if="scope.row.oper==1" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            @current-change="handleCurrentChange"
            :page-size="size"
            layout="total, prev, pager, next"
            :total="allcount">
            </el-pagination>
        </div>
        <!-- 添加人员的弹窗 -->
        <addPersonShadow
        ref="son"></addPersonShadow> 
    </div>
</template>

<script>
export default {
    inject:['reload'],  //刷新时，注入reload方法
    data() {
        return {
            page:1,
            size:5,
            keyword:'',
            allcount:10,
            data1: {}
        }
    },
    methods: {
        // 编辑表格内容的方法
        handleEdit(index, row) {
            // 把表格里的值赋值到编辑框
            this.$refs.son.flag='true';
            this.$refs.son.ruleForm.name=row.name;
            this.$refs.son.ruleForm.sex=String(row.sex);
            this.$refs.son.ruleForm.phone=row.phone;
            this.$refs.son.ruleForm.pwd=row.pwd;
            this.$refs.son.ruleForm.department=row.did;
            this.$refs.son.ruleForm.menu=[];
            row.menu.forEach((item)=>{
                if(item.parent_id!=0){
                    this.$refs.son.ruleForm.menu.push(item.id)
                }
            })
            // 提示按钮改为保存编辑
            this.$refs.son.submitButton="保存";
            this.$refs.son.saveFlag=false;
            this.$refs.son.updateId=row.id;
        },
        handleDelete(index, row) {
            let deleteId=row.id;
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                // 删除后台数据，刷新界面
                this.reload();
                this.$axios.post("/systemUser/DeleteUser",this.$qs.stringify({
                    id:deleteId
                }))
                .then(res=>{
                    console.log(res.data)
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 编辑分页的方法
        handleCurrentChange(val) {
            this.page=val;
            this.$axios.post("/systemUser/ListUsers",this.$qs.stringify({
                page:this.page,
                size:this.size
            }))
            .then(res=>{
                this.data1=res.data;
            })
        },
        // 点击新增人员的方法
        addperson(){
            // 调用子组件里的值
            this.$refs.son.flag=true;
            this.$refs.son.registerFlag=false;
            this.$refs.son.saveFlag=true;
            // 调用子组件里的方法
            this.$refs.son.clearMsg('ruleForm');
        },
        // 子组件调用刷新table的方法
        refreshTable() {
            this.reload();
        },
        // 根据sex来显示男女
        stateFormat(row,column) {
            if(row.sex=='1'){
                return '男'
            }else{
                return '女'
            }
        }
    },
    created() {
        // 请求数据
        this.$axios.post("/systemUser/ListUsers",this.$qs.stringify({
            page:this.page,
            size:this.size
        }))
        .then(res=>{
            this.data1=res.data;
            this.allcount=res.data.count;
        })
    },
}
</script>

<style>
    .el-breadcrumb{
        line-height: 28px;
    }
    #addperson{
        float: right;
    }
</style>