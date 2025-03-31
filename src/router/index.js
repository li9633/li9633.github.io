import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  // history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/IndexPage.vue'),
      children: [
        {
          path: '/home',
          name: 'HomePage',
          meta: {
            title: '首页',
          },
          component: () => import('@/views/HomePage/HomePage.vue'),
        },
        {
          path: '/article',
          name: 'ArticlePage',
          meta: {
            title: '文章',
          },
          component: () => import('@/views/ArticlePage/ArticlePage.vue'),
        },
        {
          path: '/favorite',
          name: 'FavoritePage',
          meta: {
            title: '收藏',
          },
          component: () => import('@/views/FavoritePage/FavoritePage.vue'),
        },
        {
          path: '/more',
          name: 'MorePage',
          meta: {
            title: '更多',
          },
          component: () => import('@/views/MorePage/MorePage.vue'),
        },
        {
          path: '/my',
          name: 'MyPage',
          meta: {
            title: '我的',
          },
          component: () => import('@/views/MyPage/MyPage.vue'),
        },
        {
          path: '/about',
          name: 'AboutPage',
          meta: {
            title: '关于',
          },
          component: () => import('@/views/AboutPage/AboutPage.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundPage/NotFound.vue'),
    },
  ],
})

export default router
