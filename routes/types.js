const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Types, Categories } = require('../models');

/* GET All */
router.get('/', async (req, res) => {
  try {
    const data = await Types.findAll();
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
    const data = await Types.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Type not found' });
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
  body('category_id').notEmpty(),
  body('name').notEmpty(),
  body('passing_grade').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await Types.create(req.body);
    return res.json({
      message: 'Type has been created.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* PATCH */
router.patch('/:id', [
  body('category_id').notEmpty(),
  body('name').notEmpty(),
  body('passing_grade').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = await Types.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Type not found' });
    }
    await Types.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'Type has been updated.'
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
    const data = await Types.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Type not found' });
    }
    await Types.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'Type has been deleted.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
