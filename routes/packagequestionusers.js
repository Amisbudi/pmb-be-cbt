const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { PackageQuestionUsers, PackageQuestions, Types } = require('../models');

/* GET All */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const data = await PackageQuestionUsers.findAll({
      include: [
        {
          model: PackageQuestions,
          as: "package",
          include: [
            {
              model: Types,
              as: "type",
            },
          ],
        },
      ],
      limit: limit,
      offset: offset,
    });

    const totalItems = await PackageQuestionUsers.count();
    const totalPages = Math.ceil(totalItems / limit);

    return res.json({
      data,
      limit,
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* GET by User ID */
router.get('/user/:userId', async (req, res) => {
  try {
    const data = await PackageQuestionUsers.findAll({
      where: {
        user_id: req.params.userId
      },
      include: [
        {
          model: PackageQuestions,
          as: "package",
          include: [
            {
              model: Types,
              as: "type",
            },
          ],
        },
      ],
    });
    if (!data) {
      return res.status(404).json({ message: 'Package question users not found' });
    }
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* POST */
router.post('/', [
  body('package_question_id').notEmpty(),
  body('user_id').notEmpty(),
  body('classes').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await PackageQuestionUsers.create({
      package_question_id: req.body.package_question_id,
      user_id: req.body.user_id,
      classes: req.body.classes,
      date_exam: req.body.date_exam,
      date_start: req.body.date_start,
      date_end: req.body.date_end,
      status: req.body.status,
    });
    return res.json({
      message: 'Package question user has been created.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* PATCH */
router.patch('/:id', [
  body('package_question_id').notEmpty(),
  body('user_id').notEmpty(),
  body('classes').notEmpty(),
  body('status').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = await PackageQuestionUsers.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Package question user not found' });
    }
    await PackageQuestions.update({
      package_question_id: req.body.package_question_id,
      user_id: req.body.user_id,
      classes: req.body.classes,
      date_exam: req.body.date_exam,
      date_start: req.body.date_start,
      date_end: req.body.date_end,
      status: req.body.status,
    }, {
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'Package question user has been updated.'
    });
  }  catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* DELETE One by ID */
router.delete('/:id', async (req, res) => {
  try {
    const data = await PackageQuestionUsers.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Package question user not found' });
    }
    await PackageQuestionUsers.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'Package question user has been deleted.'
    });
  }  catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;