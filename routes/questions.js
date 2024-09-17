const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Questions, PackageQuestions, Answers } = require('../models');

/* GET All */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const data = await Questions.findAll({
      include: [
        {
          model: PackageQuestions,
          as: "package",
        },
      ],
      limit: limit,
      offset: offset,
    });
    const totalItems = await Questions.count();
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

/* GET One by ID */
router.get('/:id', async (req, res) => {
  try {
    const data = await Questions.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Question not found' });
    }
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* GET by packageQuestionID */
router.get('/packagequestion/:id', async (req, res) => {
  try {
    const data = await Questions.findAll({
      where: {
        package_question_id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Question not found' });
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
  body('name').notEmpty(),
  body('answer_1').notEmpty(),
  body('answer_1_status').notEmpty(),
  body('answer_2').notEmpty(),
  body('answer_2_status').notEmpty(),
  body('answer_3').notEmpty(),
  body('answer_3_status').notEmpty(),
  body('answer_4').notEmpty(),
  body('answer_4_status').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const question = await Questions.create({
      package_question_id: req.body.package_question_id,
      name: req.body.name,
      status: true
    });
    await Answers.create({
      question_id: question.id,
      name: req.body.answer_1,
      is_right: req.body.answer_1_status,
    });
    await Answers.create({
      question_id: question.id,
      name: req.body.answer_2,
      is_right: req.body.answer_2_status,
    });
    await Answers.create({
      question_id: question.id,
      name: req.body.answer_3,
      is_right: req.body.answer_3_status,
    });
    await Answers.create({
      question_id: question.id,
      name: req.body.answer_4,
      is_right: req.body.answer_4_status,
    });
    return res.json({
      message: 'Question has been created.'
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
  body('name').notEmpty(),
  body('answer_1').notEmpty(),
  body('answer_1_id').notEmpty(),
  body('answer_1_status').notEmpty(),
  body('answer_2').notEmpty(),
  body('answer_2_id').notEmpty(),
  body('answer_2_status').notEmpty(),
  body('answer_3').notEmpty(),
  body('answer_3_id').notEmpty(),
  body('answer_3_status').notEmpty(),
  body('answer_4').notEmpty(),
  body('answer_4_id').notEmpty(),
  body('answer_4_status').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = await Questions.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await Questions.update({
      package_question_id: req.body.package_question_id,
      name: req.body.name,
      status: req.body.status
    }, {
      where: {
        id: req.params.id
      }
    });

    await Answers.update({
      name: req.body.answer_1,
      is_right: req.body.answer_1_status
    }, {
      where: {
        id: req.body.answer_1_id,
        question_id: req.params.id,
      }
    });

    await Answers.update({
      name: req.body.answer_2,
      is_right: req.body.answer_2_status
    }, {
      where: {
        id: req.body.answer_2_id,
        question_id: req.params.id,
      }
    });

    await Answers.update({
      name: req.body.answer_3,
      is_right: req.body.answer_3_status
    }, {
      where: {
        id: req.body.answer_3_id,
        question_id: req.params.id,
      }
    });

    await Answers.update({
      name: req.body.answer_4,
      is_right: req.body.answer_4_status
    }, {
      where: {
        id: req.body.answer_4_id,
        question_id: req.params.id,
      }
    });
    return res.json({
      message: 'Question has been updated.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* DELETE One by ID */
router.delete('/:id', async (req, res) => {
  try {
    const data = await Questions.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Question not found' });
    }
    await Questions.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'Question has been deleted.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
