const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Files, Categories } = require('../models');

/* GET All */
router.get('/', async (req, res) => {
  try {
    const data = await Files.findAll();
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
    const data = await Files.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'File not found' });
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
  body('category_id').notEmpty(),
  body('name').notEmpty(),
  body('namefile').notEmpty(),
  body('accept').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await Files.create(req.body);
    return res.json({
      message: 'File has been created.'
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
  body('category_id').notEmpty(),
  body('name').notEmpty(),
  body('namefile').notEmpty(),
  body('accept').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = await Files.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'File not found' });
    }
    await Files.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'File has been updated.'
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
    const data = await Files.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'File not found' });
    }
    await Files.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'File has been deleted.'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Trouble in the server'
    });
  }
});

module.exports = router;
