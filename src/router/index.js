import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/components/Layout/BasicLayout.vue'
import { validateToken } from '@/utils/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'LoginPage',
      meta: { title: '登录' },
      component: () => import('@/views/Auth/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'RegisterPage',
      meta: { title: '注册' },
      component: () => import('@/views/Auth/RegisterPage.vue')
    },
    {
      path: '/',
      redirect: '/home',
      component: MainLayout,
      children: [
        {
          path: 'home',
          name: 'HomePage',
          meta: { title: '首页' },
          component: () => import('@/views/HomePage/HomePage.vue')
        },
        {
          path: 'article',
          name: 'ArticlePage',
          meta: { title: '文章' },
          component: () =>
            import('@/views/ArticlePage/ArticlePage.vue')
        },
        {
          path: 'favorite',
          name: 'FavoritePage',
          meta: { title: '收藏' },
          component: () =>
            import('@/views/FavoritePage/FavoritePage.vue')
        },
        {
          path: 'more',
          name: 'MorePage',
          meta: { title: '更多' },
          component: () => import('@/views/MorePage/MorePage.vue')
        },
        {
          path: 'my',
          name: 'MyPage',
          meta: { title: '我的', requiresAuth: true },
          component: () => import('@/views/MyPage/MyPage.vue')
        },
        {
          path: 'about',
          name: 'AboutPage',
          meta: { title: '关于' },
          component: () => import('@/views/AboutPage/AboutPage.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundPage/NotFound.vue')
    }
  ]
})


router.beforeEach(async (to, from, next) => {
  document.title = (to.meta.title || "未知页面") + " | 昕屿千行"

  const token = localStorage.getItem('token')
  const isAuthenticated = token && await validateToken(token)

  if ((to.name === 'LoginPage' || to.name === 'RegisterPage') && isAuthenticated) {
    next({ path: '/' })
    return
  }

  // 需要认证的路由检查
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next({
        name: 'LoginPage',
        query: { redirect: to.fullPath }
      })
      return
    }
  }

  next()
})

// 重置滚动位置
router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
