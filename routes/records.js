const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Records, Answers, Questions, PackageQuestions } = require('../models');

/* GET All */
router.get('/', async (req, res) => {
  try {
    const data = await Records.findAll({
      include: [
        {
          model: Answers,
          as: "answer",
        },
        {
          model: Questions,
          as: "question",
        },
        {
          model: PackageQuestions,
          as: "package",
        },
      ]
    });
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Trouble in the server'
    });
  }
});

/* GET One by ID */
router.get('/:id', async (req, res) => {
  try {
    const data = await Records.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Record not found' });
    }
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Trouble in the server'
    });
  }
});

/* GET One by ID */
router.get('/question/:questionId/:packageQuestionId', async (req, res) => {
  try {
    const data = await Records.findOne({
      where: {
        question_id: req.params.questionId,
        package_question_id: req.params.packageQuestionId
      },
      include: [
        {
          model: Answers,
          as: "answer",
        },
      ]
    });
    if (!data) {
      return res.status(404).json({ message: 'Record not found' });
    }
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Trouble in the server'
    });
  }
});

/* POST */
router.post('/', [
  body('question_user_id').notEmpty(),
  body('question_id').notEmpty(),
  body('package_question_id').notEmpty(),
  body('answer_id').notEmpty(),
  body('user_id').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await Records.create(req.body);
    return res.json({
      message: 'Record has been created.'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Trouble in the server'
    });
  }
});

/* PATCH */
router.patch('/:questionId/:packageQuestionId', [
  body('user_id').notEmpty(),
  body('answer_id').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = await Records.findOne({
      where: {
        question_id: req.params.questionId,
        package_question_id: req.params.packageQuestionId
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Record not found' });
    }
    await Records.update({
      answer_id: req.body.answer_id
    }, {
      where: {
        question_id: req.params.questionId,
        package_question_id: req.params.packageQuestionId
      }
    });
    return res.json({
      message: 'Record has been updated.'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Trouble in the server'
    });
  }
});

/* DELETE One by ID */
router.delete('/:id', async (req, res) => {
  try {
    const data = await Records.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Record not found' });
    }
    await Records.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'Record has been deleted.'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Trouble in the server'
    });
  }
});

module.exports = router;
