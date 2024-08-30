const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Questions } = require('../models');

/* GET All */
router.get('/', async (req, res) => {
  try {
    const data = await Questions.findAll();
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
    const data = await Questions.findOne({
      where: {
        id: req.params.id
      }
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
  body('name').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await Questions.create(req.body);
    return res.json({
      message: 'Question has been created.'
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
    const data = await Questions.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Question not found' });
    }
    await Questions.update(req.body, {
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
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Trouble in the server'
    });
  }
});

module.exports = router;
