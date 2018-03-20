import q from 'jan-request';
var router = new q.Router();

router.use({
  'getProjectList': 'project/queryProjectInfoList',
  'getProjectDetail': 'project/queryProjectInfoById',
  'getProjectListByPid': 'project/queryRelatedProjects',

  'submitProjectProcess': {url:'project/submitProject',method: q.method.POST},
  'saveProjectRemark': {url:'project/saveOrUpdateRemarks',method: q.method.POST},
  'stopProject': {url:'project/endProject',method: q.method.POST},
  'getCustomerList': 'customer/page',
  'updateMasterProjectInfo':{url:'project/updateSubjectProject',method: q.method.POST},
  'updateProjectInfo':{url:'project/updateProject',method: q.method.POST},
  // 岗位配置管理-岗位列表
  getJobs: 'per/{id}/post/list',
  // 岗位配置管理-查看岗位详情
  getJobDetail: 'per/post/{id}',
  // 岗位配置管理-单个新增岗位
  addJob: {
    url: 'per/post/add',
    method: q.method.POST
  },
  // 岗位配置管理-修改岗位
  editJob: {
    url: 'per/post/{id}/update',
    method: q.method.POST
  },
  // 岗位列表
  'getPostList': '{id}/posts',
  // 岗位配置管理-删除岗位
  deleteJob: {
    url: 'per/post/{id}/delete',
    method: q.method.POST
  },
  // 岗位配置管理-获取批量新增岗位模版
  getTemplateJob: 'per/post/batchTemplate',
  // 岗位配置管理-批量新增岗位
  batchAddJob: {
    url: 'per/post/batchAdd/{id}',
    method: q.method.POST
  },
  // 运营日报-运营日报数据查询
  getDailyOperations: '{id}/per/operatingDaily/list',
  // 查看岗位配置的绩效指标列表
  getPerList: 'per/post/{id}/indicators',
  // 查看岗位详情
  getPer: 'per/post/{id}',
  //获取计算规则列表
  getRules: 'per/indicator/calRules',
  // 获取绩效指标库列表
  getLibrary: 'per/indicator/library',
  // 获取计算规则参数列表
  getCalRule: 'per/indicator/caLRule/{id}/params',
  // 单个新增绩效指标
  addPer: {
    url: 'per/indicator/add',
    method: q.method.POST
  },
  // 获取批量新增模板
  persTemplate: 'per/indicator/batchTemplate',
  // 删除绩效指标
  delPer: {
    url: 'per/indicator/{id}/delete',
    method: q.method.POST
  },
  // 获取绩效指标规则
  getEdit: 'per/indicator/{id}/calRule',
  // 修改绩效指标
  editPer: {
    url: 'per/indicator/{id}/update',
    method: q.method.POST
  },
  // 批量添加绩效指标
  addPers: {
    url: 'per/indicator/batchAdd',
    method: q.method.POST
  },
  getLookList: 'per/post/{id}/indicators',
  // 运营日报-获取项目已经配置的配置项列表
  getDailyOperationConfigs: '{id}/per/operatingDaily/configValues',
  // 运营日报-运营日报配置项枚举值
  getAllDailyOperationConfigs: 'per/operatingDaily/config/params',
  // 查看岗位详情
  getPer: 'per/post/{id}',
  // 运营日报-配置项配置
  dailyManage: {
    url: '{id}/per/operatingDaily/config',
    method: q.method.POST
  },
  getCompactList: 'set/{id}/contracts',
  //配置合同添加
  addContracts: {
    url:'set/{projectId}/contract/config',
    method: q.method.POST
  },
  //选择合同内容 查询列表
  getChoiceContractsList:'set/contracts',
  //获取合同详情
  getContractDetail:'set/{contractId}',
  //下载合同
  downContract:'set/{contractId}/download'

});

// module.exports = router;
export default router;
