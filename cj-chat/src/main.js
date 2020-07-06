import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"
import Vant from 'vant';
import 'vant/lib/index.css';
import xss from 'xss'
Vue.prototype.$xss=xss

Vue.config.productionTip = false

const socketOptions = {
  autoConnect: false,       // 自动连接     这里为我项目需求  需要在指定情况下才连接socket
}
Vue.use(
  new VueSocketIO({
    debug: false ,   // debug调试，生产建议关闭
    connection: SocketIO("http://localhost:8888", socketOptions),
    store,          // 如果没有使用到store可以不用写
  })
)
Vue.use(Vant);

new Vue({
  sockets: {
    connecting() {
      console.log('正在连接')
    },
    disconnect() {
      console.log("Socket 断开");
    },
    connect_failed() {
      console.log('连接失败')
    },
    connect() {
      console.log('socket connected')
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
