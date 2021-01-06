var express = require('express');
var router = express.Router();

const controller = require('../controllers/post')

/* GET posts listing. */
router.get('/', controller.get_post_list);

router.get('/:id', controller.get_post_detail);

router.post('/', controller.create_post);

module.exports = router;
