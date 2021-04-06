import Vue from 'vue'
import App from './App.vue'
import './assets/sass/all.css'

Vue.config.productionTip = false

Vue.filter('formatTime', function (timestamp) {
  const d = new Date(timestamp)
  return d.toLocaleString()
})

new Vue({
  render: h => h(App),
}).$mount('#app')
