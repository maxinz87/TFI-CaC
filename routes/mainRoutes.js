const { Router } = require('express');
const { mainPortal } = require('../controllers/webs/main');

const router = Router();

router.get('/', mainPortal);

module.exports = router;