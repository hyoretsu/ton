module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContentMessages', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      contentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Contents',
          key: 'id',
        },
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ContentMessages');
  },
};
