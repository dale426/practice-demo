import q from 'jan-request';
import util from '~/assets/js/libs/util';
var router = new q.Router();

router.use({
  'getLowerLevelArea': 'static/getLowerLevelArea',
  'getIndustryList': 'static/getIndustryList',
  'b2cCalculate': 'calculate/calculate',
  'getB2cDetail': 'calculate/queryCalculateResult',
  'getMyReportList': { url: 'customer/query/list', method: q.method.POST },
  'b2cCalculate': 'calculate/calculate',
  'b2cSave': { url: 'calculate/save', method: q.method.POST },
  'delMyReportList': { url: 'customer/delete', method: q.method.POST },
  'getUserInfo': util.sysUrl + '/loginUserInfo',
  'warehouseList': 'warehouse/listPage'
});

// module.exports = router;
export default router;
