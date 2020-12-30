var express = require('express');
var router = express.Router();

const controller = require('../controllers/user');

/* GET users listing. */
router.get('/', controller.get_user_list);

router.get('/:id', controller.get_user_detail);

module.exports = router;
