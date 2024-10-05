const express = require("express");
const router = express.Router();
const verifyapikey = require("../middleware/verifyapitoken");
const XLSX = require("xlsx");
const { body, validationResult } = require("express-validator");
const { Questions, PackageQuestions, Answers } = require("../models");

/* questions */
router.get("/", verifyapikey, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const data = await Questions.findAll({
      include: [
        {
          model: PackageQuestions,
          as: "package",
        },
      ],
      limit: limit,
      offset: offset,
    });
    const totalItems = await Questions.count();
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
      message: error.message,
    });
  }
});

/* question by id */
router.get("/:id", verifyapikey, async (req, res) => {
  try {
    const data = await Questions.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

/* question image by id */
router.get("/image/:id", async (req, res) => {
  try {
    const data = await Questions.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      return res.status(404).json({ message: "Question not found" });
    }
    if (!data.image) {
      return res
        .status(404)
        .json({ message: "No image found for this record" });
    }
    res.set("Content-Type", "image/jpeg");
    res.send(data.image);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

/* question by package question id */
router.get("/packagequestion/:id", verifyapikey, async (req, res) => {
  try {
    const data = await Questions.findAll({
      where: {
        package_question_id: req.params.id,
      },
    });
    if (!data) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

/* question & answers */
router.post(
  "/",
  verifyapikey,
  [
    body("package_question_id").notEmpty(),
    body("name").notEmpty(),
    body("answer_1").notEmpty(),
    body("answer_1_status").notEmpty(),
    body("answer_2").notEmpty(),
    body("answer_2_status").notEmpty(),
    body("answer_3").notEmpty(),
    body("answer_3_status").notEmpty(),
    body("answer_4").notEmpty(),
    body("answer_4_status").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let question;
      if (req.body.image) {
        const base64Image = req.body.image;
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
        const bufferData = Buffer.from(base64Data, "base64");
        question = await Questions.create({
          package_question_id: req.body.package_question_id,
          name: req.body.name,
          image: bufferData,
          status: true,
        });
      } else {
        question = await Questions.create({
          package_question_id: req.body.package_question_id,
          name: req.body.name,
          status: true,
        });
      }

      if (req.body.answer_1_image) {
        const base64Image = req.body.answer_1_image;
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
        const bufferData = Buffer.from(base64Data, "base64");
        await Answers.create({
          question_id: question.id,
          name: req.body.answer_1,
          image: bufferData,
          is_right: req.body.answer_1_status,
        });
      } else {
        await Answers.create({
          question_id: question.id,
          name: req.body.answer_1,
          is_right: req.body.answer_1_status,
        });
      }

      if (req.body.answer_2_image) {
        const base64Image = req.body.answer_2_image;
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
        const bufferData = Buffer.from(base64Data, "base64");
        await Answers.create({
          question_id: question.id,
          name: req.body.answer_2,
          image: bufferData,
          is_right: req.body.answer_2_status,
        });
      } else {
        await Answers.create({
          question_id: question.id,
          name: req.body.answer_2,
          is_right: req.body.answer_2_status,
        });
      }

      if (req.body.answer_3_image) {
        const base64Image = req.body.answer_3_image;
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
        const bufferData = Buffer.from(base64Data, "base64");
        await Answers.create({
          question_id: question.id,
          name: req.body.answer_3,
          image: bufferData,
          is_right: req.body.answer_3_status,
        });
      } else {
        await Answers.create({
          question_id: question.id,
          name: req.body.answer_3,
          is_right: req.body.answer_3_status,
        });
      }

      if (req.body.answer_4_image) {
        const base64Image = req.body.answer_4_image;
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
        const bufferData = Buffer.from(base64Data, "base64");
        await Answers.create({
          question_id: question.id,
          name: req.body.answer_4,
          image: bufferData,
          is_right: req.body.answer_4_status,
        });
      } else {
        await Answers.create({
          question_id: question.id,
          name: req.body.answer_4,
          is_right: req.body.answer_4_status,
        });
      }

      return res.json({
        message: "Question has been created.",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
);

/* question & answers */
router.post(
  "/import",
  verifyapikey,
  [body("package_question_id").notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const base64Excel = req.body.excel;

      const imageSizeInBytes = Buffer.from(
        base64Excel.replace(
          /^data:application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet;base64,/,
          "",
        ),
        "base64",
      ).length;
      const maxSizeInBytes = 1 * 1024 * 1024;
      if (imageSizeInBytes > maxSizeInBytes) {
        return res.status(400).json({ message: "File size max 1MB." });
      }

      const base64Data = base64Excel.replace(
        /^data:application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet;base64,/,
        "",
      );
      const bufferData = Buffer.from(base64Data, "base64");
      const workbook = XLSX.read(bufferData, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const questions = XLSX.utils.sheet_to_json(worksheet);
      for (let i = 0; i < questions.length; i++) {
        let question = await Questions.create({
          package_question_id: req.body.package_question_id,
          name: questions[i].question,
          status: true,
        });
        await Answers.create({
          question_id: question.id,
          name: questions[i].answer_1,
          is_right: questions[i].answer_1_status,
        });

        await Answers.create({
          question_id: question.id,
          name: questions[i].answer_2,
          is_right: questions[i].answer_2_status,
        });

        await Answers.create({
          question_id: question.id,
          name: questions[i].answer_3,
          is_right: questions[i].answer_3_status,
        });

        await Answers.create({
          question_id: question.id,
          name: questions[i].answer_4,
          is_right: questions[i].answer_4_status,
        });
      }
      return res.json({
        message: "Question import has been succesfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
);

/* question & answers */
router.patch(
  "/:id",
  verifyapikey,
  [
    body("package_question_id").notEmpty(),
    body("name").notEmpty(),
    body("answer_1").notEmpty(),
    body("answer_1_id").notEmpty(),
    body("answer_1_status").notEmpty(),
    body("answer_2").notEmpty(),
    body("answer_2_id").notEmpty(),
    body("answer_2_status").notEmpty(),
    body("answer_3").notEmpty(),
    body("answer_3_id").notEmpty(),
    body("answer_3_status").notEmpty(),
    body("answer_4").notEmpty(),
    body("answer_4_id").notEmpty(),
    body("answer_4_status").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const data = await Questions.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!data) {
        return res.status(404).json({ message: "Question not found" });
      }

      if (req.body.image) {
        if (req.body.image.type === "Buffer") {
          await Questions.update(
            {
              package_question_id: req.body.package_question_id,
              name: req.body.name,
              status: req.body.status,
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

          const base64Data = base64Image.replace(
            /^data:image\/\w+;base64,/,
            "",
          );
          const bufferData = Buffer.from(base64Data, "base64");
          await Questions.update(
            {
              package_question_id: req.body.package_question_id,
              name: req.body.name,
              image: bufferData,
              status: req.body.status,
            },
            {
              where: {
                id: req.params.id,
              },
            },
          );
        }
      } else {
        await Questions.update(
          {
            package_question_id: req.body.package_question_id,
            name: req.body.name,
            status: req.body.status,
          },
          {
            where: {
              id: req.params.id,
            },
          },
        );
      }

      if (req.body.answer_1_image) {
        if (req.body.answer_1_image.type === "Buffer") {
          await Answers.update(
            {
              name: req.body.answer_1,
              is_right: req.body.answer_1_status,
            },
            {
              where: {
                id: req.body.answer_1_id,
                question_id: req.params.id,
              },
            },
          );
        } else {
          const base64Image = req.body.answer_1_image;
          const imageSizeInBytes = Buffer.from(
            base64Image.replace(/^data:image\/\w+;base64,/, ""),
            "base64",
          ).length;
          const maxSizeInBytes = 1 * 1024 * 1024;
          if (imageSizeInBytes > maxSizeInBytes) {
            return res.status(400).json({ message: "File size max 1MB." });
          }
          const base64Data = base64Image.replace(
            /^data:image\/\w+;base64,/,
            "",
          );
          const bufferData = Buffer.from(base64Data, "base64");
          await Answers.update(
            {
              name: req.body.answer_1,
              image: bufferData,
              is_right: req.body.answer_1_status,
            },
            {
              where: {
                id: req.body.answer_1_id,
                question_id: req.params.id,
              },
            },
          );
        }
      } else {
        await Answers.update(
          {
            name: req.body.answer_1,
            is_right: req.body.answer_1_status,
          },
          {
            where: {
              id: req.body.answer_1_id,
              question_id: req.params.id,
            },
          },
        );
      }

      if (req.body.answer_2_image) {
        if (req.body.answer_2_image.type === "Buffer") {
          await Answers.update(
            {
              name: req.body.answer_2,
              is_right: req.body.answer_2_status,
            },
            {
              where: {
                id: req.body.answer_2_id,
                question_id: req.params.id,
              },
            },
          );
        } else {
          const base64Image = req.body.answer_2_image;
          const imageSizeInBytes = Buffer.from(
            base64Image.replace(/^data:image\/\w+;base64,/, ""),
            "base64",
          ).length;
          const maxSizeInBytes = 1 * 1024 * 1024;
          if (imageSizeInBytes > maxSizeInBytes) {
            return res.status(400).json({ message: "File size max 1MB." });
          }
          const base64Data = base64Image.replace(
            /^data:image\/\w+;base64,/,
            "",
          );
          const bufferData = Buffer.from(base64Data, "base64");
          await Answers.update(
            {
              name: req.body.answer_2,
              image: bufferData,
              is_right: req.body.answer_2_status,
            },
            {
              where: {
                id: req.body.answer_2_id,
                question_id: req.params.id,
              },
            },
          );
        }
      } else {
        await Answers.update(
          {
            name: req.body.answer_2,
            is_right: req.body.answer_2_status,
          },
          {
            where: {
              id: req.body.answer_2_id,
              question_id: req.params.id,
            },
          },
        );
      }

      if (req.body.answer_3_image) {
        if (req.body.answer_3_image.type === "Buffer") {
          await Answers.update(
            {
              name: req.body.answer_3,
              is_right: req.body.answer_3_status,
            },
            {
              where: {
                id: req.body.answer_3_id,
                question_id: req.params.id,
              },
            },
          );
        } else {
          const base64Image = req.body.answer_3_image;
          const imageSizeInBytes = Buffer.from(
            base64Image.replace(/^data:image\/\w+;base64,/, ""),
            "base64",
          ).length;
          const maxSizeInBytes = 1 * 1024 * 1024;
          if (imageSizeInBytes > maxSizeInBytes) {
            return res.status(400).json({ message: "File size max 1MB." });
          }
          const base64Data = base64Image.replace(
            /^data:image\/\w+;base64,/,
            "",
          );
          const bufferData = Buffer.from(base64Data, "base64");
          await Answers.update(
            {
              name: req.body.answer_3,
              image: bufferData,
              is_right: req.body.answer_3_status,
            },
            {
              where: {
                id: req.body.answer_3_id,
                question_id: req.params.id,
              },
            },
          );
        }
      } else {
        await Answers.update(
          {
            name: req.body.answer_3,
            is_right: req.body.answer_3_status,
          },
          {
            where: {
              id: req.body.answer_3_id,
              question_id: req.params.id,
            },
          },
        );
      }

      if (req.body.answer_4_image) {
        if (req.body.answer_4_image.type === "Buffer") {
          await Answers.update(
            {
              name: req.body.answer_4,
              is_right: req.body.answer_4_status,
            },
            {
              where: {
                id: req.body.answer_4_id,
                question_id: req.params.id,
              },
            },
          );
        } else {
          const base64Image = req.body.answer_4_image;
          const imageSizeInBytes = Buffer.from(
            base64Image.replace(/^data:image\/\w+;base64,/, ""),
            "base64",
          ).length;
          const maxSizeInBytes = 1 * 1024 * 1024;
          if (imageSizeInBytes > maxSizeInBytes) {
            return res.status(400).json({ message: "File size max 1MB." });
          }
          const base64Data = base64Image.replace(
            /^data:image\/\w+;base64,/,
            "",
          );
          const bufferData = Buffer.from(base64Data, "base64");
          await Answers.update(
            {
              name: req.body.answer_4,
              image: bufferData,
              is_right: req.body.answer_4_status,
            },
            {
              where: {
                id: req.body.answer_4_id,
                question_id: req.params.id,
              },
            },
          );
        }
      } else {
        await Answers.update(
          {
            name: req.body.answer_4,
            is_right: req.body.answer_4_status,
          },
          {
            where: {
              id: req.body.answer_4_id,
              question_id: req.params.id,
            },
          },
        );
      }

      return res.json({
        message: "Question has been updated.",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
);

/* answer by id */
router.delete("/:id", verifyapikey, async (req, res) => {
  try {
    const data = await Questions.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      return res.status(404).json({ message: "Question not found" });
    }
    await Questions.destroy({
      where: {
        id: req.params.id,
      },
    });
    await Answers.destroy({
      where: {
        question_id: req.params.id,
      },
    });
    return res.json({
      message: "Question has been deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
