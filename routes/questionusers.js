const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { QuestionUsers, PackageQuestions, Questions, ViewQuestionUsers, Records } = require('../models');

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
        }, {
          model: PackageQuestions,
          as: "package",
        },
      ]
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

router.get(`/results`, async(req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const data = await ViewQuestionUsers.findAll({
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt']
      },
      limit: limit,
      offset: offset,
    });

    const totalItems = await ViewQuestionUsers.count();
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
router.get('/:questionNumber/:packageQuestion', async (req, res) => {
  try {
    const data = await QuestionUsers.findOne({
      where: {
        number: req.params.questionNumber,
        package_question_id: req.params.packageQuestion
      },
      include: [
        {
          model: Questions,
          as: "question",
          include: {
            model: PackageQuestions,
            as: "package"
          }
        }, {
          model: PackageQuestions,
          as: "package",
        },
      ]
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

/* GET Questions By PackageQuestionID & UserID */
router.get('/questions/:packageQuestionId/:userId', async (req, res) => {
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
        }, {
          model: PackageQuestions,
          as: "package",
        },
      ]
    });
    if (!data) {
      return res.status(404).json({ message: 'Questions not found' });
    }
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* GET packagequestion By PackageQuestionID & UserID */
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
        }, {
          model: PackageQuestions,
          as: "package",
        },
      ]
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
    const dateStart = new Date();
    const dateEnd = new Date();
    dateEnd.setMinutes(dateEnd.getMinutes() + 60);
    let dataBulk = []
    shuffledQuestions.forEach((shuffle, index) => {
      dataBulk.push({
        number: index + 1,
        question_id: shuffle.id,
        package_question_id: package.id,
        user_id: req.body.user_id,
        date_start: dateStart.toISOString(),
        date_end: dateEnd.toISOString()
      });
    });
    await QuestionUsers.bulkCreate(dataBulk);
    return res.json({
      message: 'Question for user has been created.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* DELETE by PackageQUestionID */
router.delete('/:packageQuestionId', async (req, res) => {
  try {
    const data = await QuestionUsers.findOne({
      where: {
        package_question_id: req.params.packageQuestionId
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Question not found' });
    }
    await QuestionUsers.destroy({
      where: {
        package_question_id: req.params.packageQuestionId
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

/* DELETE One by ID */
router.delete('/results/:packageQuestionId/:userId', async (req, res) => {
  try {
    const data = await QuestionUsers.findOne({
      where: {
        package_question_id: req.params.packageQuestionId,
        user_id: req.params.userId,
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Results not found' });
    }
    await QuestionUsers.destroy({
      where: {
        package_question_id: req.params.packageQuestionId,
        user_id: req.params.userId,
      }
    });

    await Records.destroy({
      where: {
        package_question_id: req.params.packageQuestionId,
        user_id: req.params.userId,
      }
    });
    return res.json({
      message: 'Results has been deleted.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
