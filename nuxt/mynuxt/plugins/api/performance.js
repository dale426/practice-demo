import q from 'jan-request';
import util from '~/assets/js/libs/util';
var router = new q.Router();

router.use({
    'getPerformanceTargetList': '{projectId}/per/post/{id}/indicatorValues',
    'getPerformanceHistoryList': 'per/post/{id}/his/indicators'
});

// module.exports = router;
export default router;
