'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE VIEW ViewQuestionUsers AS
      SELECT
        qu.package_question_id,
        pq.name AS package_name,
        COUNT(CASE WHEN a.is_right = TRUE THEN 1 END) AS correct_answers,
        COUNT(CASE WHEN a.is_right = FALSE THEN 1 END) AS incorrect_answers,
        tq.total_questions,
        qu.user_id
      FROM
        QuestionUsers qu
      INNER JOIN
        Records r ON qu.question_id = r.question_id
      INNER JOIN
        Answers a ON r.answer_id = a.id
      INNER JOIN
        PackageQuestions pq ON qu.package_question_id = pq.id
      INNER JOIN
      (SELECT
          package_question_id,
          COUNT(DISTINCT question_id) AS total_questions
      FROM
          QuestionUsers
      GROUP BY
          package_question_id
      ) tq ON qu.package_question_id = tq.package_question_id
      GROUP BY
        qu.package_question_id,
        qu.user_id,
        pq.name,
        tq.total_questions;
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS ViewQuestionUsers;');
  }
};