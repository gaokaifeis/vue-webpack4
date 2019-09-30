import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.component('jsx-example', {
  // eslint-disable-next-line no-unused-vars
  render (h) { // <-- h must be in scope
    return <div id="foo">123</div>
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
