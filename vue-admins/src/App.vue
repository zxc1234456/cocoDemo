<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import store from './store';
export default {
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data() {
    return {
      isRouterAlive:true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  created () {
    store.dispatch('getRoutes');
    console.log(store.state.dataRoutes)
    // if(sessionStorage.getItem("isLogin")){
    //   // 在页面加载时读取sessionStorage
    // if (sessionStorage.getItem('store')) {
    //   this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    // }
    // // 在页面刷新时将store保存到sessionStorage里
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    // })
    // }
  }
}
</script>

<style scoped>
body{
  margin: 0;
}
#app {
  margin: 0;
  padding:0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
