import Vue from 'vue'
import Root from './components/root.vue'
new Vue({
  el: '#rootDiv',
  render: h => h(Root),
  components: {
    'root': Root
  }
})