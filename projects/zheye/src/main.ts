import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'

import App from './App.vue'
axios.defaults.baseURL = 'http://localhost:7001/api/'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  // get 请求，添加到 url 中
  config.params = { ...config.params, icode: '34708A3A36A53FC5' }
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', '34708A3A36A53FC5')
  } else {
    // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: '34708A3A36A53FC5' }
  }
  return config
})

axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(e.response.data)
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
