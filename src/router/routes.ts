export const routes = [
  {
    name: 'formalHomes',
    path: '/formalHomes',
    component: () => import('@/views/formalHomes/index.vue'),
    meta: {
      title: '政务一体化便民自助服务终端',
      keepAlive: true,
    },
  },
  {
    name: 'sResult',
    path: '/sResult',
    component: () => import('@/views/sResult/index.vue'),
    meta: {
      title: '搜索',
      keepAlive: true,
    },
  },
  {
    name: 'eProvince',
    path: '/eProvince',
    component: () => import('@/views/eProvince/index.vue'),
    meta: {
      title: '省市',
      keepAlive: true,
    },
  },
  {
    name: 'readingCardnoface',
    path: '/readingCardnoface',
    component: () => import('@/views/readingCardnoface/index.vue'),
    meta: {
      title: '读卡认证',
      keepAlive: true,
    },
  },
  {
    name: 'demo1',
    path: '/demo1',
    component: () => import('@/views/demo1/index.vue'),
    meta: {
      title: 'demo1',
      keepAlive: true,
    },
  },
  {
    path: '/home',
    redirect: '/home/home',
    component: () => import('@/layout/basic/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: 'tabbar.home',
          keepAlive: true,
        },
      },
      {
        path: 'demo',
        component: () => import('@/views/demo/index.vue'),
        meta: {
          title: 'tabbar.demo',
          keepAlive: true,
        },
      },
    ],
  },
  // 匹配不到重定向会主页
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    redirect: '/formalHomes',
  },
];

export default routes;
