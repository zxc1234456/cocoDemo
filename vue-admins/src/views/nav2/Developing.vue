<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">信用系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>客户管理</el-breadcrumb-item>
            <el-breadcrumb-item>待挖掘客户</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 表格数据操作 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="">
            <el-input v-model="formInline.keyWord" placeholder="请输入公司名称 / 法人 / 联系电话" class="keyInp"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button 
            type="primary" 
            :plain="true"
            @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            accept=".xls,.xlsx"   
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :file-list="fileList"
            >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">目前仅支持excel格式</div>
        </el-upload>
        </el-form>

        <!-- 表格数据展示 -->
        <el-table
            ref="filterTable"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
            type="index"
            label="序号"
            width="50">
            </el-table-column>
            <el-table-column
            prop="cname"
            label="公司名称"
            width="240">
            </el-table-column>
            <el-table-column
            prop="corporation"
            label="法人">
            </el-table-column>
            <el-table-column
            prop="phone"
            label="联系电话">
            </el-table-column>
            <el-table-column
            prop="city"
            label="地区">
            </el-table-column>
            <el-table-column
            prop="storageTime"
            label="入库时间">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" icon="el-icon-circle-plus-outline" @click="selfBuilt(scope.$index, scope.row)">自建客户</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            @current-change="changePage"
            :page-size="size"
            layout="total, prev, pager, next"
            :total="allcount">
            </el-pagination>
        </div>
        <!-- 自建客户的弹窗 -->
        <selfBuiltShadow
        ref="son"></selfBuiltShadow> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            page:1,
            size:5,
            allcount:10,
            formInline: {
                keyWord: ''
            },
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            tableData: [{
                id:'1',
                cname: '北京国信创新科技股份有限公司',
                corporation: '王小虎',
                phone: '12239665533',
                city: '北京',
                storageTime: '2019-08-09',
            },
            {
                id:'1',
                cname: '北京国信创新科技股份有限公司',
                corporation: '王中虎',
                phone: '12239665533',
                city: '北京',
                storageTime: '2019-08-09',
            },
            {
                id:'1',
                cname: '北京国信创新科技股份有限公司',
                corporation: '王大虎',
                phone: '12239665533',
                city: '北京',
                storageTime: '2019-08-09',
            }]
        }
    },
    methods: {
        // 提交搜索信息
        onSubmit() {
            if(this.formInline.keyWord){
                if(this.formInline.keyWord.length<=100){

                }else{
                    this.$message({
                        message:'最多输入100个字',
                        type: 'warning'
                    });
                }
            }else{
                this.$message({
                    message:'请输入你要搜索的关键字',
                    type: 'warning'
                });
            }
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // 发送excel数据到后台
        beforeUpload(file) {
            // let fd = new FormData()
            // fd.append('file',file)
            // fd.append('groupId',this.groupId)
            // this.$axios.post("/systemUser/DeleteUser",this.$qs.stringify(fd)).then(res => {
            //     console.log(res)
            // })
            // return true
        },
        // 自建客户
        selfBuilt(index,row) {
            console.log(row);
            this.$refs.son.flag=true;
        },
        // 切换页码
        changePage(val) {
            this.page=val;
            // this.$axios.post("/systemUser/ListUsers",this.$qs.stringify({
            //     page:this.page,
            //     size:this.size
            // }))
            // .then(res=>{
            //     this.data1=res.data;
            // })
        },
    }
}
</script>

<style scoped>
    .el-breadcrumb{
        font-size: 16px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
    }
    .demo-form-inline{
        background-color: #f6f8fc;
        margin:10px 0;
        text-align: left;
        height: 32px;
        padding:20px;
    }
    .keyInp{
        width: 300px;
    }
    .upload-demo{
        float:right;
    }
    .block{
        margin: 20px;
    }
</style>