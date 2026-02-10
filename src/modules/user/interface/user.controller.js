const service = require('../service/user.service');

exports.createUser = async (req, res, next) => {
  try {
    const user = await service.createUser(req.body);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await service.getUserById(req.params.id);
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (e) {
    next(e);
  }
};
