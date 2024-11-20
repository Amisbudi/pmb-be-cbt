'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cbt_question_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      number: {
        type: Sequelize.INTEGER,
      },
      question_id: {
        type: Sequelize.BIGINT
      },
      package_question_id: {
        type: Sequelize.BIGINT
      },
      id_grup_questions: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.STRING
      },
      date_start: {
        type: Sequelize.DATE
      },
      date_end: {
        type: Sequelize.DATE
      },
      answered: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('cbt_question_users');
  }
};