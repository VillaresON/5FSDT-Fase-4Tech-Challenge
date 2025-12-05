const router = require('express').Router({ mergeParams: true });
const ctrl = require('../controllers/comment.controller');

router.get('/', ctrl.list);
router.post('/', ctrl.create);

module.exports = router;
