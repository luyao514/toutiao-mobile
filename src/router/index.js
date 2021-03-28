import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/Login.vue')
}, {
  path: '/',
  // name: 'Layout',// 拥有默认子路由后，父路由的name属性没有意义
  component: () => import('@/views/layout/Layout.vue'),
  children: [{
    path: '', // 默认子路由
    name: 'home',
    component: () => import('@/views/home/Home.vue')
  }, {
    path: 'questionAnswer',
    name: 'questionAnswer',
    component: () => import('@/views/questionAnswer/QuestionAnswer.vue')
  }, {
    path: 'video',
    name: 'video',
    component: () => import('@/views/video/Video.vue')
  }, {
    path: 'my',
    name: 'my',
    component: () => import('@/views/my/My.vue')
  }]
}]

const router = new VueRouter({
  routes
})

export default router
