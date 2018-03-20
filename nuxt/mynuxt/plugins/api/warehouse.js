import q from 'jan-request';
import util from '~/assets/js/libs/util';

var router = new q.Router();

router.use({
    'getWarehouseList': 'warehouse/listPage',
    'getWarehouseDetailData':'warehouse/getData',
    'getWarehouseProjectList':'project/getWarehouseRelatedProjects',
    'getWarehouseTemplate': 'settlement/download',
    'WarehouseImport': { url: 'settlement/upload', method: q.method.POST },
    'WarehouseCheckUploaded': 'settlement/download/checkUploaded/{id}'
});

// module.exports = router;
export default router;
