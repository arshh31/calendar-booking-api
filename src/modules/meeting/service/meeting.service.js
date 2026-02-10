const { Op } = require('sequelize');
const Meeting = require('../model/meeting.model');
const User = require('../../user/model/user.model');

async function checkConflict({ userId, startTime, endTime }, excludeId = null) {

  const where = {
    userId,
    startTime: { [Op.lt]: endTime },
    endTime: { [Op.gt]: startTime }
  };

  if (excludeId) {
    where.id = { [Op.ne]: excludeId };
  }

  const conflict = await Meeting.findOne({ where });

  return !!conflict;
}

exports.createMeeting = async (data) => {

  const user = await User.findByPk(data.userId);
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }

  const conflict = await checkConflict(data);

  if (conflict) {
    const err = new Error('Time slot already booked');
    err.statusCode = 400;
    throw err;
  }

  return Meeting.create(data);
};


exports.getMeetings = async (filters) => {

  const where = {};

  if (filters.userId) {
    where.userId = filters.userId;
  }

  if (filters.startDate && filters.endDate) {
    where.startTime = { [Op.gte]: filters.startDate };
    where.endTime = { [Op.lte]: filters.endDate };
  }

  return Meeting.findAll({ where });
};


exports.getMeetingById = (id) => {
  return Meeting.findByPk(id);
};


exports.updateMeeting = async (id, data) => {

  const meeting = await Meeting.findByPk(id);
  if (!meeting) return null;

  const startTime = data.startTime || meeting.startTime;
  const endTime = data.endTime || meeting.endTime;
  const userId = data.userId || meeting.userId;

  const conflict = await checkConflict(
    { userId, startTime, endTime },
    id
  );

  if (conflict) {
    const err = new Error('Time slot already booked');
    err.statusCode = 400;
    throw err;
  }

  await meeting.update(data);
  return meeting;
};


exports.deleteMeeting = (id) => {
  return Meeting.destroy({ where: { id } });
};
