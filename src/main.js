import Vue from 'vue'

import router from './router'
import store from './store'
import "reset-css"
import "@/vantui"

Vue.filter("RMBformat",val=>{
  return "￥" + Number(val).toFixed(2) + "元"
})


Vue.config.productionTip = false
import App from './App.vue'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
