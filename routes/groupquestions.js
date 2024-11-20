const express = require('express');
const router = express.Router();
const verifyapikey = require('../middleware/verifyapitoken')
const { body, validationResult } = require('express-validator');
const { GroupQuestion, PackageQuestions} = require('../models')

router.get("/", verifyapikey, async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const data = await GroupQuestion.findAll({
        include: [
          {
            model: PackageQuestions,
            as: "package_questions",
          },
        ],
        limit: limit,
        offset: offset,
      });
  
      const totalItems = await GroupQuestion.count();
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

router.post("/", verifyapikey, [
  body('name').notEmpty(),
  body('naration').notEmpty(),
  body('duration').notEmpty(),
  body('package_question_id').optional(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.body.image) {
      const base64Image = req.body.image;
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
      const bufferData = Buffer.from(base64Data, "base64");
      await GroupQuestion.create({
        name: req.body.name,
        naration: req.body.naration,
        duration: req.body.duration,
        image: bufferData,
        package_question_id: req.body.package_question_id
      });  
    } else {
      await GroupQuestion.create({
        name: req.body.name,
        naration: req.body.naration,
        duration: req.body.duration,
        package_question_id: req.body.package_question_id
      }); 
    }
    return res.json({
      message: 'Grouping question has been created.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

router.patch('/:id', verifyapikey, [
  body('name').notEmpty(),
  body('naration').optional(),
  body('duration').notEmpty(),
  body('package_question_id').optional(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await GroupQuestion.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!data) {
      return res.status(404).json({ message: 'Group question not found' });
    }

    if (req.body.image) {
      if (req.body.image.type === "Buffer") {
        await GroupQuestion.update(
          {
            name: req.body.name,
            naration: req.body.naration,
            duration: req.body.duration,
            package_question_id: req.body.package_question_id
          },
          {
            where: {
              id: req.params.id,
            },
          },
        );
      } else {
        const base64Image = req.body.image;
        const imageSizeInBytes = Buffer.from(
          base64Image.replace(/^data:image\/\w+;base64,/, ""),
          "base64",
        ).length;
        const maxSizeInBytes = 1 * 1024 * 1024;
        if (imageSizeInBytes > maxSizeInBytes) {
          return res.status(400).json({ message: "File size max 1MB." });
        }

        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "",);
        const bufferData = Buffer.from(base64Data, "base64");
        await GroupQuestion.update(
          {
            package_question_id: req.body.package_question_id,
            naration: req.body.naration,
            name: req.body.name,
            image: bufferData,
            duration: req.body.duration,
          },
          {
            where: {
              id: req.params.id,
            },
          },
        );
      }
    } else {
      await GroupQuestion.update(
        {
          package_question_id: req.body.package_question_id,
          naration: req.body.naration,
          name: req.body.name,
          duration: req.body.duration,
        },
        {
          where: {
            id: req.params.id,
          },
        },
      );
    }
    return res.json({
      message: 'Grouping question has been updated.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

router.delete("/:id", verifyapikey, async (req, res) => {
  try {
    const data = await GroupQuestion.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      return res.status(404).json({ message: "Group question not found" });
    }
    await GroupQuestion.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json({
      message: "Grouping question has been deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;