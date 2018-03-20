import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
  path: '/403',
  meta: {
    title: '403-权限不足'
  },
  name: 'error-403',
  component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误'
  },
  name: 'error-500',
  component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};


export const locking = {
  path: '/locking',
  name: 'locking',
  component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
    { path: 'warehouse/:warehouse_id', title:'仓库详情', name: 'warehouse_detail', component: resolve => { require(['@/views/warehouse/components/warehouseDeatail.vue'], resolve); } },
    { path: 'masterProjectEdit', title: '主项目编辑', name: 'masterProjectEdit',  component: resolve => { require(['@/views/project/masterProjectEdit.vue'], resolve)} },
    { path: 'masterProjectInfo', title: '主项目详情', name: 'masterProjectInfo',  component: resolve => { require(['@/views/project/masterProjectInfo.vue'], resolve)} },
    { path: 'masterProjectCtrl', title: '主项目操作', name: 'masterProjectCtrl',  component: resolve => { require(['@/views/project/masterProjectCtr.vue'], resolve)} },
    { path: 'addProject', title: '新建项目', name: 'addProject', component: resolve => { require(['@/views/project/addProject.vue'], resolve) } },
    { path: 'projectEdit', title: '项目编辑', name: 'projectEdit',  component: resolve => { require(['@/views/project/projectEdit.vue'], resolve)} },
    { path: 'projectInfo', title: '项目详情', name: 'projectInfo',  component: resolve => { require(['@/views/project/projectInfo.vue'], resolve)} },
    { path: 'projectCtrl', title: '项目操作', name: 'projectCtrl',  component: resolve => { require(['@/views/project/projectCtrl.vue'], resolve)} },
    { path: 'jobConfiguration', title: '人员绩效', name: 'jobConfiguration', component: resolve => { require(['@/views/project/jobConfiguration/list.vue'], resolve)} },
    { path: 'look', title: '查看岗位', name: 'look', component: resolve => { require(['@/views/project/jobConfiguration/look.vue'], resolve) } },
    { path: 'configPerformance', title: '配置岗位', name: 'configPerformance', component: resolve => { require(['@/views/project/jobConfiguration/configPerformance.vue'], resolve) } },
    { path: 'performance/target', title: '绩效指标', name: 'performance-target',  component: resolve => { require(['@/views/project/performance/performanceTarget.vue'], resolve) } },
    { path: 'performance/history', title: '历史绩效', name: 'performance-history',  component: resolve => { require(['@/views/project/performance/performanceHistory.vue'], resolve) } },
  ]
};


// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/project',
    icon: 'icon-xiangmu',
    name: 'project',
    title: '项目管理',
    component: Main,
    children: [
      { path: 'list', title: '项目列表', name: 'project-list',  component: resolve => { require(['@/views/project/list.vue'], resolve) }},
      { path: 'contractList/:pid', title: '配置合同', name: 'HRO-contractList', noShow: true, component: resolve => { require(['@/views/HROManage/contractList.vue'], resolve) }},
      { path: 'contractDetail/:pid/:cid', title: '合同详情', name: 'HRO-contractDetail', noShow: true,  component: resolve => { require(['@/views/HROManage/contractDetail.vue'], resolve) }},
    ]
  },
  {
    path: '/config',
    icon: 'icon-peizhi',
    name: 'config',
    title: '配置管理',
    component: Main,
    children: [
      { path: 'type', title: '类型配置', name: 'config-type', component: resolve => { require(['@/views/config/type-config.vue'], resolve); } },
      { path: 'type/add', title: '新建类型', name: 'edit-config-type', noShow: true, component: resolve =>{ require(['@/views/config/edit-type-config.vue'], resolve); } },
      { path: 'type/detail', title: '配置类型详情', name: 'detail-config-type', noShow: true, component: resolve =>{ require(['@/views/config/detail-type-config.vue'], resolve); } }
    ]
  },
  {
    path: '/warehouse',
    icon: 'icon-cangku',
    name: 'warehouse',
    title: '仓库管理',
    component: Main,
    children: [
      { path: 'list', title: '仓库列表', name: 'warehouse-list', component: resolve => { require(['@/views/warehouse/list.vue'], resolve); } }
    ]
  },

  {
    path: '/mydaily',
    icon: 'icon-ribao',
    name: 'mydaily',
    title: '我的日报',
    component: Main,
    children: [
      { path: '', title: '我的日报', name: 'mydaily_index', component: resolve => { require(['@/views/mydaily/list.vue'], resolve); } }
    ]
  }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  otherRouter,
  locking,
  ...appRouter,
  page500,
  page403,
  page404
];
