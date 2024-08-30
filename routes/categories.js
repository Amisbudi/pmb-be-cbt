const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Categories, ProgramStudies } = require('../models');

/* GET All */
router.get('/', async (req, res) => {
  try {
    const data = await Categories.findAll();
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
    const data = await Categories.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Category not found' });
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
  body('program_study_id').notEmpty(),
  body('name').notEmpty(),
  body('price').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await Categories.create(req.body);
    return res.json({
      message: 'Category has been created.'
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
  body('program_study_id').notEmpty(),
  body('name').notEmpty(),
  body('price').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = await Categories.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await Categories.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'Category has been updated.'
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
    const data = await Categories.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await Categories.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'Category has been deleted.'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Trouble in the server'
    });
  }
});

module.exports = router;
