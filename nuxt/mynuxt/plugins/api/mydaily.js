import q from 'jan-request';
var router = new q.Router();

router.use({
  'getMyDailyList': 'per/operatingDaily/my',
  'dailyTemplate' : 'per/operatingDaily/download',
  'dailyImport': { url: 'per/operatingDaily/upload', method: q.method.POST },
});

// module.exports = router;
export default router;
