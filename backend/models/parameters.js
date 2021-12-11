export default (sequelize, DataTypes) => {

	const Parameter = sequelize.define('Parameter', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    key: { type: DataTypes.STRING, allowNull: true },
    value: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: 'parameters',
  });

  return Parameter;
};