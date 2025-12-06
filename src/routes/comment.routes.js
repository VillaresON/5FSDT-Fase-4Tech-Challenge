const router = require('express').Router({ mergeParams: true });
const auth = require("../middlewares/auth.middleware");
const ctrl = require('../controllers/comment.controller');

router.get('/', ctrl.list);
router.post('/', auth, ctrl.create);

module.exports = router;
