import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
import Login from '../views/login/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter (to, from, next) {
      // console.log(to, from)
      // {fullPath: "/", hash: "", query: {…}, name: "Home", path: "/",…}
      // {fullPath: "/login", hash: "", query: {…}, name: "Login", path: "/login",…}
      // next()  // 调用 next 逻辑才会继续执行
      // const isLogin = localStorage.isLogin
      // if (isLogin) {
      //   next({ name: 'Home' })
      // } else {
      //   next()
      // }
      // 上面的代码可以精简
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  }
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 在 Chrome 里的 Application 里看 local Storage
  // const isLogin = localStorage.isLogin
  // if (isLogin || to.name === 'Login') {
  //   next()
  // } else {
  //   next({ name: 'Login' })
  // }
  // console.log(to, from)
  // 上面的代码可以精简
  const { isLogin } = localStorage;
  (isLogin || to.name === 'Login') ? next() : next({ name: 'Login' })
  next()
})

export default router
