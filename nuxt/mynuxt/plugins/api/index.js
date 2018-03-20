import templateApi from './template';
import configApi from './config';
import warehouseApi from './warehouse';
import projectApi from './project';
import performanceApi from './performance';
import mydailyApi from './mydaily';
import q from 'jan-request';
import util from '~/assets/js/libs/util';
var jq = new q();

/**
 * 初始化配置
 */
jq.init({
  baseURL: '/projectmanager/',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

/**
 * 添加路由
 */
// jq.use(templateApi)
//   .use(configApi)
//   .use(warehouseApi)
//   .use(projectApi)
//   .use(performanceApi)
//   .use(mydailyApi);
jq.use(projectApi);
/**
 * 添加拦截器
 */
jq.interceptor({
  request: function (config) {
    return config;
  },
  response: function (response) {
    var _response = response.data;
    if (_response.code == '00005') {
      util.layout();
    }
    return response;
  },
  responseError: function (error) {
    return error;
  }
});

export default jq;