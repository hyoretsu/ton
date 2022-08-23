module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('DentalPhotos', 'patientId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('DentalPhotos', 'patientId');
  },
};
