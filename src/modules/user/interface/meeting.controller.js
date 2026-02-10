const service = require('../service/meeting.service');
const validate = require('../dto/createMeeting.dto');

exports.createMeeting = async (req, res, next) => {
  try {

    const err = validate(req.body);
    if (err) return res.status(400).json({ message: err });

    const meeting = await service.createMeeting(req.body);
    res.status(201).json(meeting);

  } catch (e) {
    next(e);
  }
};

exports.getMeetings = async (req, res, next) => {
  try {
    const data = await service.getMeetings(req.query);
    res.json(data);
  } catch (e) {
    next(e);
  }
};

exports.getMeetingById = async (req, res, next) => {
  try {
    const meeting = await service.getMeetingById(req.params.id);
    if (!meeting) return res.sendStatus(404);
    res.json(meeting);
  } catch (e) {
    next(e);
  }
};

exports.updateMeeting = async (req, res, next) => {
  try {

    if (req.body.startTime && req.body.endTime) {
      if (new Date(req.body.startTime) >= new Date(req.body.endTime)) {
        return res.status(400).json({ message: 'startTime must be before endTime' });
      }
    }

    const meeting = await service.updateMeeting(req.params.id, req.body);
    if (!meeting) return res.sendStatus(404);

    res.json(meeting);

  } catch (e) {
    next(e);
  }
};

exports.deleteMeeting = async (req, res, next) => {
  try {
    const deleted = await service.deleteMeeting(req.params.id);
    if (!deleted) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};
