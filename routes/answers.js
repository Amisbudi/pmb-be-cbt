const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Answers, Questions } = require('../models');

/* GET All */
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

/* GET One by ID */
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

/* GET by Question ID */
router.get('/question/:id', async (req, res) => {
  try {
    const data = await Answers.findAll({
      where: {
        question_id: req.params.id
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

/* POST */
router.post('/', [
  body('question_id').notEmpty(),
  body('name').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await Answers.create(req.body);
    return res.json({
      message: 'Answer has been created.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* PATCH */
router.patch('/:id', [
  body('question_id').notEmpty(),
  body('name').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = await Answers.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    await Answers.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'Answer has been updated.'
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
    const data = await Answers.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    await Answers.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'Answer has been deleted.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
