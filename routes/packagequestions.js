const express = require('express');
const router = express.Router();
const verifyapikey = require('../middleware/verifyapitoken');
const { body, validationResult } = require('express-validator');
const { PackageQuestions, Types } = require('../models');

/* package questions */
router.get('/', verifyapikey, async (req, res) => {
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

/* package question by id */
router.get('/:id', verifyapikey, async (req, res) => {
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
router.post('/', verifyapikey, [
  body('type_id').notEmpty(),
  body('name').notEmpty(),
  body('count_answer').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await PackageQuestions.create({
      type_id: req.body.type_id,
      name: req.body.name,
      count_answer: req.body.count_answer,
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
router.patch('/:id', verifyapikey, [
  body('type_id').notEmpty(),
  body('name').notEmpty(),
  body('count_answer').notEmpty(),
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
      count_answer: req.body.count_answer,
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
router.delete('/:id', verifyapikey, async (req, res) => {
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
