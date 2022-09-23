module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('ContentMessages', 'message', 'body');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('ContentMessages', 'body', 'message');
  },
};
