const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { QuestionUsers, PackageQuestions, Questions } = require('../models');

/* GET All */
router.get('/', async (req, res) => {
  try {
    const data = await QuestionUsers.findAll({
      include: [
        {
          model: Questions,
          as: "question",
          include: {
            model: PackageQuestions,
            as: "package"
          }
        },{
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
    const data = await QuestionUsers.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Questions,
          as: "question",
          include: {
            model: PackageQuestions,
            as: "package"
          }
        },{
          model: PackageQuestions,
          as: "package",
        },
      ]
    });
    if (!data) {
      return res.status(404).json({ message: 'Question not found' });
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
router.get('/packagequestion/:packageQuestionId/:userId', async (req, res) => {
  try {
    const data = await QuestionUsers.findAll({
      where: {
        package_question_id: req.params.packageQuestionId,
        user_id: req.params.userId
      },
      include: [
        {
          model: Questions,
          as: "question",
          include: {
            model: PackageQuestions,
            as: "package"
          }
        },{
          model: PackageQuestions,
          as: "package",
        },
      ]
    });
    if (!data) {
      return res.status(404).json({ message: 'Question not found' });
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
  body('package_question_id').notEmpty(),
  body('user_id').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const package = await PackageQuestions.findOne({
      where: {
        id: req.body.package_question_id
      }
    });
    if (!package) {
      return res.status(404).json({ message: 'Package question not found' });
    }
    const questions = await Questions.findAll({
      where: {
        package_question_id: package.id
      }
    });
    if (!questions) {
      return res.status(404).json({ message: 'Questions not found' });
    }
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    const datetime = new Date();
    let dataBulk = []
    shuffledQuestions.forEach((shuffle) => {
      dataBulk.push({
        question_id: shuffle.id,
        package_question_id: package.id,
        user_id: req.body.user_id,
        date: datetime,
      });
    });
    await QuestionUsers.bulkCreate(dataBulk);
    return res.json({
      message: 'Question for user has been created.'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Trouble in the server'
    });
  }
});

/* PATCH */
router.patch('/:id', [
  body('package_question_id').notEmpty(),
  body('name').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = await QuestionUsers.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Question not found' });
    }
    await QuestionUsers.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'Question has been updated.'
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
    const data = await QuestionUsers.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Question not found' });
    }
    await QuestionUsers.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'Question has been deleted.'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Trouble in the server'
    });
  }
});

module.exports = router;
