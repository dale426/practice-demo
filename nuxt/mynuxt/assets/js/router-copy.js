
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    // component: Main,
    children: [
    ]
  };
export const appRouter = [
    {
        path: '/',
        name: 'otherRouter',
        redirect: '/home',
        // component: Main,
        children: [
        ]
      }
];
export const routers = [
    otherRouter,
    ...appRouter
  ];