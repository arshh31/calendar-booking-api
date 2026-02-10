const router = require('express').Router();
const controller = require('../interface/meeting.controller');

router.post('/', controller.createMeeting);
router.get('/', controller.getMeetings);
router.get('/:id', controller.getMeetingById);
router.put('/:id', controller.updateMeeting);
router.delete('/:id', controller.deleteMeeting);

module.exports = router;
