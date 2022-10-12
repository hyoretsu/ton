/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('CheckupAnswers', 'answer');
    await queryInterface.addColumn('CheckupAnswers', 'answer', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('CheckupAnswers', 'answer');
    await queryInterface.addColumn('CheckupAnswers', 'answer', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
