export default (sequelize, DataTypes) => {

	const Assistance = sequelize.define('Assistance', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    closedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: 'assistances',
  });

  Assistance.associate = function(models) {
    models.Assistance.belongsTo(models.User);
  };

  return Assistance;
};