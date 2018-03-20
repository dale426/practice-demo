import q from 'jan-request';
var router = new q.Router();

router.use({
  'getTypeConfigList': 'actType/listPage',
  'addTypeConfig': { url: 'actType/addActType', method: q.method.POST },
  'detailTypeConfig': 'actType/actTypeView',
  'updateTypeStatus': { url: 'actType/updateIsUse', method: q.method.POST },
  'checkType': 'actType/checkInUse',
  'deleteType': { url: 'actType/delActTypeById/{id}', method: q.method.POST },
  'getProjectList': 'project/queryProjectInfoList',
  'addProject': { url: 'project/insertProject', method: q.method.POST },
  'listSubject': 'project/listSubjectProject',
  'getEnums': 'enums/get',
  'projectType': 'project/queryProjectType',
  'getNCProject': 'ncProject/page',
  'getCustomerList': 'customer/page',
});

// module.exports = router;
export default router;