import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { getToken } from '@/utils/auth' // get token from cookie

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/register.vue')
  },
  {
    path: '/mycenter',
    name: 'Mycenter',
    component: () => import(/* webpackChunkName: "about" */ '../views/mycenter.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/search.vue')
  },
  {
    path: '/creategroup',
    name: 'Creategroup',
    component: () => import(/* webpackChunkName: "about" */ '../views/creategroup.vue')
  },
  {
    path: '/friendrequest',
    name: 'Friendrequest',
    component: () => import(/* webpackChunkName: "about" */ '../views/friendrequest.vue')
  },
  {
    path: '/grouprequest',
    name: 'Grouprequest',
    component: () => import(/* webpackChunkName: "about" */ '../views/grouprequest.vue')
  },
  {
    path: '/addfriend',
    name: 'Addfriend',
    component: () => import(/* webpackChunkName: "about" */ '../views/addfriend.vue')
  },
  {
    path: '/friendmessage',
    name: 'Friendmessage',
    component: () => import(/* webpackChunkName: "about" */ '../views/friendmessage.vue')
  }, 
  {
    path: '/groupmessage',
    name: 'Groupmessage',
    component: () => import(/* webpackChunkName: "about" */ '../views/groupmessage.vue')
  }, 
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})
router.beforeEach(async(to, from, next) => {
  const hasToken = getToken()
  // 判断是否存在token
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      // NProgress.done()
    } else {
      // 判断是否已经获取到了user信息，如果获取过了，直接跳转，没有获取则去获取
      const hasGetUserInfo = !!store.getters.userInfo
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 获取userInfo
          await store.dispatch('getUserInfo').then((res) => {
          })
          next()
        } catch (error) {
          // token过期，获取userinfo失败，重新登录
          await store.dispatch('resetToken')
          // Message.error(error || 'Has Error')
          console.log(error)
          next('/login')
          // NProgress.done()
        }
      }
    }
  } else {
    if (to.path=='/login' || to.path=='/register') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
