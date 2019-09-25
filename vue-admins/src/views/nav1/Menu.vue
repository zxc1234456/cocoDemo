<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>菜单维护</el-breadcrumb-item>
        </el-breadcrumb>

        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <!-- <div style="margin: 15px 0;"></div> -->
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(city,i) in cities" :label="i" :key="i">{{city}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true
      };
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    },
    watch: {
        'checkedCities' (){
            console.log(this.checkedCities)
        }
    }
  };
</script>