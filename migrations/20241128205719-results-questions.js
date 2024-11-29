'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE VIEW resultsquestions AS
      SELECT
        qu.package_question_id,
        pq.name AS package_name,
        pq.type_of_question,
        COUNT(CASE WHEN a.is_right = TRUE THEN 1 END) AS correct_answers,
        COUNT(CASE WHEN a.is_right = FALSE THEN 1 END) AS incorrect_answers,
        tq.total_questions,
        qu.user_id,
        pa.fullname,
        r.essay_image,
        r.essay_image_result,
        r.created_at,
        r.id AS record_id
      FROM
        cbt_question_users qu
      INNER JOIN
        participants pa ON qu.user_id = pa.identify_number
      LEFT JOIN
        cbt_records r ON qu.question_id = r.question_id
      LEFT JOIN
        cbt_answers a ON r.answer_id = a.id
      INNER JOIN
        cbt_package_questions pq ON qu.package_question_id = pq.id
      INNER JOIN
      (SELECT
          package_question_id,
          COUNT(DISTINCT question_id) AS total_questions
      FROM
          cbt_question_users
      GROUP BY
          package_question_id
      ) tq ON qu.package_question_id = tq.package_question_id
      GROUP BY
        qu.package_question_id,
        qu.user_id,
        pa.fullname,
        pq.name,
        pq.type_of_question,
        tq.total_questions,
        r.essay_image,
        r.essay_image_result,
        r.created_at, 
        r.id;
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS resultsquestions');
  }
};
