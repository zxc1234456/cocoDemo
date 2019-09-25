<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">信用系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>客户管理</el-breadcrumb-item>
            <el-breadcrumb-item>待分配客户</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 表格数据操作 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <p class="addmsg">
            今日新增
            <span id="addspan">{{newAdditions}}</span>
        </p>
        <el-form-item label="批量分配：">
            <el-select v-model="formInline.batchSale" placeholder="分配销售" >
                <el-option v-for="(item,i) in salesMan" :key="i" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button 
            type="primary" 
            :plain="true"
            @click="onSubmit">批量分配</el-button>
        </el-form-item>
        </el-form>

        <!-- 表格数据展示 -->
        <el-table
            ref="filterTable"
            :data="tableData"
            stripe
            style="width: 100%"
            @selection-change="changeSel">
            <el-table-column
            type="selection"
            label="全选"
            width="55">
            </el-table-column>
            <el-table-column
            prop="cname"
            label="公司名称"
            width="240">
            </el-table-column>
            <el-table-column
            prop="contact"
            label="联系人">
            </el-table-column>
            <el-table-column
            prop="phone"
            label="联系电话">
            </el-table-column>
            <el-table-column
            prop="city"
            label="地区"
            :filters="[{ text: '北京', value: '北京' }, { text: '上海', value: '上海' }, { text: '天津', value: '天津' }]"
            :filter-method="filterCity">
            <template slot-scope="scope">
                <el-tag
                disable-transitions>{{scope.row.city}}</el-tag>
            </template>
            </el-table-column>
            <el-table-column
            prop="storageTime"
            label="入库时间">
            </el-table-column>
            <el-table-column label="分配销售" prop="sales">
                <template slot-scope="scope">
                <el-select 
                placeholder="请选择" 
                size="small"
                :plain="true"
                v-model="scope.row.sales"
                @change="currentSel(scope.row)">
                    <el-option
                    v-for="item in salesMan"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
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
    </div>
</template>

<script>
export default {
    inject:['reload'],  //刷新时，注入reload方法
    data() {
      return {
        page:1,
        size:5,
        allcount:10,
        newAdditions:12,   //今日新增参数
        batchList:[],  //批量操作的数据集合
        salesMan:[
            {label: "杨培一" , value: "yangpeiyi"},
            {label: "路文瑜" , value: "luwenyu"},
            {label: "胡志诚" , value: "huzhicheng"},
            {label: "史爱红" , value: "shiaihong"},
            {label: "王鑫" , value: "wangxin"}
        ],
        tableData: [{
            id:'1',
            cname: '北京国信创新科技股份有限公司',
            contact: '王小虎',
            phone: '12239665533',
            city: '北京',
            storageTime: '2019-08-09',
            sales:''
        },
        {
            id:'2',
            cname: '北京国信创新科技股份有限公司',
            contact: '王小虎',
            phone: '12239665533',
            city: '上海',
            storageTime: '2019-08-09',
            sales:''
        },
        {
            id:'3',
            cname: '北京国信创新科技股份有限公司',
            contact: '王小虎',
            phone: '12239665533',
            city: '天津',
            storageTime: '2019-08-09',
            sales:''
        },
        {
            id:'4',
            cname: '北京喜洋洋科技有限公司',
            contact: '王大虎',
            phone: '12239665533',
            city: '北京',
            storageTime: '2019-08-09',
            sales:''
        }],
        formInline: {
            batchSale: ''
        }
      }
    },
    methods: {
        // 地区筛选
        filterCity(value, row) {
            return row.city === value;
        },
        // 批量分配销售
        onSubmit() {
            if(this.batchList.length!=0){
                if(this.formInline.batchSale){
                    // 把batchList的数据和batchSale传给后台,刷新列表
                    this.$message({
                        showClose: true,
                        message: '恭喜你，批量分配成功',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: '请为批量分配的客户添加销售',
                        type: 'warning'
                    });
                }
            }else{
                this.$message({
                    message: '请勾选你要分配的客户',
                    type:'warning'
                });
            }
        },
        // 单个销售分配
        currentSel(row) {
            this.$message({
                showClose: true,
                message: '恭喜你，分配销售成功',
                type: 'success'
            });
            console.log(row);
            // 这里传id给后台，然后this.reload()更新一下列表
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
        changeSel(val) {
            this.batchList=val;
        }
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
        text-align: right;
        height: 32px;
        padding:20px 0;
    }
    .block{
        margin: 20px;
    }
    .addmsg{
        float: left;
        font-size: 16px;
        line-height: 32px;
        padding-left: 20px;
        color:#606266;
    }
    #addspan{
        color: #409EFF;
        font-weight: bold;
    }
</style>