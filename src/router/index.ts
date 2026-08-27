import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Juan Román Garza × PHB | Entiende tu salud. Decide mejor. Actúa antes.' },
  },
  {
    path: '/aprende',
    name: 'Aprende',
    component: () => import('../views/AprendeView.vue'),
    meta: { title: 'Aprende | Juan Román Garza × PHB' },
  },
  {
    path: '/actua',
    name: 'Actua',
    component: () => import('../views/ActuaView.vue'),
    meta: { title: 'PHB ACTÚA™ | De la conciencia a la acción' },
  },
  {
    path: '/regeneracion',
    name: 'Regeneracion',
    component: () => import('../views/RegeneracionView.vue'),
    meta: { title: 'Regeneración | Decision Before Intervention™' },
  },
  {
    path: '/conferencias',
    name: 'Conferencias',
    component: () => import('../views/ConferenciasView.vue'),
    meta: { title: 'Conferencias | Juan Román Garza Speaker' },
  },
  {
    path: '/empresas',
    name: 'Empresas',
    component: () => import('../views/EmpresasView.vue'),
    meta: { title: 'PHB Corporate Health | Programas para organizaciones' },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { left: 0, top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  const title = to.meta?.title
  if (typeof title === 'string') document.title = title
})

export default router
