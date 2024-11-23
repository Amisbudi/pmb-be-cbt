const express = require('express');
const router = express.Router();
const verifyapikey = require('../middleware/verifyapitoken');
const { body, validationResult } = require('express-validator');
const { QuestionUsers, GroupQuestion, PackageQuestions, PackageQuestionUsers, Questions, ViewQuestionUsers, Records } = require('../models');

/* question users */
router.get('/', verifyapikey, async (req, res) => {
  try {
    const data = await QuestionUsers.findAll({
      include: [
        {
          model: Questions,
          as: "question",
          include: [{
            model: PackageQuestions,
            as: "package"
          }, {
           model: GroupQuestion,
           as: 'group_questions'
          }]
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

router.get("/image/:id", async (req, res) => {
  try {
    const data = await Records.findOne({
      where: {
        id: req.params.id,
      },
    });

    const image = data.essay_image
    if (!data) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (!image) {
      return res
        .status(404)
        .json({ message: "No image found for this record" });
    }
   
    res.set("Content-Type", "image/png");
    res.send(image);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

/* result for answers */
router.get(`/results`, verifyapikey, async (req, res) => {
  try {
  
    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = Math.min(Math.max(1, parseInt(req.query.limit)), 100) || 5; 
    const offset = (page - 1) * limit;

    const totalItems = await ViewQuestionUsers.count();
    const totalPages = Math.ceil(totalItems / limit);

    // Query database
    const { rows: data } = await ViewQuestionUsers.findAndCountAll({
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt'],
      },
      limit: limit,
      offset: offset,
    });

    // Response ke client
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


/* question by question number & package question */
router.get('/:questionNumber/:packageQuestion', verifyapikey, async (req, res) => {
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
          include: [
            {
              model: PackageQuestions,
              as: "package"
            },{
              model: GroupQuestion,
              as: 'group_questions'
            }
          ]
        },
        {
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

/* question users by package question & user id */
router.get('/questions/:packageQuestionId/:userId', verifyapikey, async (req, res) => {
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

/* question user by package question id & user id */
router.get('/packagequestion/:packageQuestionId/:userId', verifyapikey, async (req, res) => {
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
          include: [
            {
              model: PackageQuestions,
              as: "package"
            },{
              model: GroupQuestion,
              as: 'group_questions'
            }
          ]
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
router.post('/', verifyapikey, [
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

/* question users by package question */
router.delete('/:packageQuestionId', verifyapikey, async (req, res) => {
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

/* question user result by package & user id */
router.delete('/results/:packageQuestionId/:userId', verifyapikey, async (req, res) => {
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
    await PackageQuestionUsers.destroy({
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
      message: 'Questions, Packages, Records user has been deleted.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
