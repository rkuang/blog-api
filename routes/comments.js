var express = require('express');
var router = express.Router();

const controller = require('../controllers/comment')

/* GET comments listing. */
router.get('/', controller.get_comment_list);

router.get('/:id', controller.get_comment_detail);

router.post('/', controller.create_comment);

module.exports = router;
