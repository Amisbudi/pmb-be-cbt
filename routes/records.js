const express = require('express');
const router = express.Router();
const verifyapikey = require('../middleware/verifyapitoken');
const { body, validationResult } = require('express-validator');
const { Records, Answers, Questions, QuestionUsers, PackageQuestions } = require('../models');

/* records */
router.get('/', verifyapikey, async (req, res) => {
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
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* record by id */
router.get('/:id', verifyapikey, async (req, res) => {
  try {
    const data = await Records.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Record not found' });
    }
    if (!data.photo) {
      return res.status(404).json({ message: 'No image found for this record' });
    }

    res.set('Content-Type', 'image/jpeg');
    res.set('Content-Disposition', `attachment; filename="image-${data.user_id}/${data.question_id}/${data.answer_id}.jpg"`);
    res.send(data.photo);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* question by question id & package question */
router.get('/question/:questionId/:packageQuestionId', verifyapikey, async (req, res) => {
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
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* record */
router.post('/', verifyapikey, [
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
    const base64Image = req.body.photo;
    if (base64Image) {
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
      const bufferData = Buffer.from(base64Data, 'base64');
      await Records.create({
        question_user_id: req.body.question_user_id,
        question_id: req.body.question_id,
        package_question_id: req.body.package_question_id,
        user_id: req.body.user_id,
        answer_id: req.body.answer_id,
        photo: bufferData
      });
    } else {
      await Records.create({
        question_user_id: req.body.question_user_id,
        question_id: req.body.question_id,
        package_question_id: req.body.package_question_id,
        user_id: req.body.user_id,
        answer_id: req.body.answer_id,
      });
    }
    await QuestionUsers.update({
      answered: true
    }, {
      where: {
        question_id: req.body.question_id
      }
    });
    return res.json({
      message: 'Record has been created.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* record by question id & package question id */
router.patch('/:questionId/:packageQuestionId', verifyapikey, [
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
    const base64Image = req.body.photo;
    if (base64Image) {
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
      const bufferData = Buffer.from(base64Data, 'base64');
      await Records.update({
        answer_id: req.body.answer_id,
        photo: bufferData,
      }, {
        where: {
          question_id: req.params.questionId,
          package_question_id: req.params.packageQuestionId
        }
      });
    } else {
      await Records.update({
        answer_id: req.body.answer_id,
      }, {
        where: {
          question_id: req.params.questionId,
          package_question_id: req.params.packageQuestionId
        }
      });
    }
    return res.json({
      message: 'Record has been updated.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* by id */
router.delete('/:id', verifyapikey, async (req, res) => {
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
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
