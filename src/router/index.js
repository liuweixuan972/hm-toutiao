import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
import home from '../views/home/index.vue'
import welcome from '../views/welcome/index.vue'
import notfound from '../views/404/index.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/login',
    component: login
  },
  {
    path: '/',
    component: home,
    children: [{
      path: '/',
      component: welcome
    }]
  }, {
    path: '*',
    component: notfound
  }
  ]
})
