import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// #region 自己写的插件
import manager from './plugins/index.js'
Vue.use(manager);
// #endregion

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

