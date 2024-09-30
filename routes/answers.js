const express = require('express');
const router = express.Router();
const { Answers, Questions } = require('../models');

/* answers */
router.get('/', async (req, res) => {
  try {
    const data = await Answers.findAll();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* answer image by id */
router.get('/image/:id', async (req, res) => {
  try {
    const data = await Answers.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    if (!data.image) {
      return res.status(404).json({ message: 'No image found for this record' });
    }
    res.set('Content-Type', 'image/jpeg');
    res.send(data.image);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* answer by id */
router.get('/:id', async (req, res) => {
  try {
    const data = await Answers.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Questions,
          as: "question",
        },
      ]
    });
    if (!data) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* answer by question_id */
router.get('/question/:questionId', async (req, res) => {
  try {
    const data = await Answers.findAll({
      where: {
        question_id: req.params.questionId
      },
      include: [
        {
          model: Questions,
          as: "question",
        },
      ]
    });
    if (!data) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
