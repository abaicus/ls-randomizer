import Vue from 'vue'
import App from './App.vue'
import inViewportDirective from 'vue-in-viewport-directive'

Vue.directive('in-viewport', inViewportDirective)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
