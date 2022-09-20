module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      senderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      recipientId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  },
};
