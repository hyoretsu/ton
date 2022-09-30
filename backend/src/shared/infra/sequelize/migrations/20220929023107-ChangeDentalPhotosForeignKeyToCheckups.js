/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('DentalPhotos', 'patientId');
    await queryInterface.addColumn('DentalPhotos', 'checkupId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Checkups',
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('DentalPhotos', 'checkupId');
    await queryInterface.addColumn('DentalPhotos', 'patientId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    });
  },
};
