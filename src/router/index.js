import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/view/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage')
        },
        {
          path: '/article/Channel',
          component: () => import('@/views/article/ArticleChannel')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword')
        }
      ]
    }
  ]
})

export default router
