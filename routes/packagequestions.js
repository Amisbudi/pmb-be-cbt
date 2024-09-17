const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { PackageQuestions, Types } = require('../models');

/* GET All */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const data = await PackageQuestions.findAll({
      include: [
        {
          model: Types,
          as: "type",
        },
      ],
      limit: limit,
      offset: offset,
    });

    const totalItems = await PackageQuestions.count();
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
router.get('/:id', async (req, res) => {
  try {
    const data = await PackageQuestions.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Package question not found' });
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
  body('type_id').notEmpty(),
  body('name').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await PackageQuestions.create({
      type_id: req.body.type_id,
      name: req.body.name,
    });
    return res.json({
      message: 'Package question has been created.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

/* PATCH */
router.patch('/:id', [
  body('type_id').notEmpty(),
  body('name').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = await PackageQuestions.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Package question not found' });
    }
    await PackageQuestions.update({
      type_id: req.body.type_id,
      name: req.body.name,
      status: req.body.status,
    }, {
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'Package question has been updated.'
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
    const data = await PackageQuestions.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!data) {
      return res.status(404).json({ message: 'Package question not found' });
    }
    await PackageQuestions.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'Package question has been deleted.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
