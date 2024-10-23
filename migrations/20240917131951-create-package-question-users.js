'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cbt_package_question_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      package_question_id: {
        type: Sequelize.BIGINT
      },
      user_id: {
        type: Sequelize.STRING
      },
      classes: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_exam: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      date_start: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      date_end: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      request_camera: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      camera_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('cbt_package_question_users');
  }
};