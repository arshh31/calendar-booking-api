const router = require('express').Router();
const controller = require('../interface/user.controller');

router.post('/', controller.createUser);
router.get('/:id', controller.getUserById);

module.exports = router;
