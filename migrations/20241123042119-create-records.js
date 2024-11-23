'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cbt_records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      question_user_id: {
        type: Sequelize.BIGINT
      },
      question_id: {
        type: Sequelize.BIGINT
      },
      package_question_id: {
        type: Sequelize.BIGINT
      },
      user_id: {
        type: Sequelize.STRING
      },
      answer_id: {
        type: Sequelize.BIGINT
      },
      id_group_questions: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      photo: {
        allowNull: true,
        type: Sequelize.BLOB,
      },
      essay_image: {
        allowNull: true,
        type: Sequelize.BLOB,
      },
      essay_image_result: {
        allowNull: true,
        type: Sequelize.BIGINT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cbt_records');
  }
};