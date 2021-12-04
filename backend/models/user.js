export default (sequelize, DataTypes) => {

	const User = sequelize.define('User', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
    cellphone: { type: DataTypes.STRING, allowNull: true },
    rolId: { type: DataTypes.INTEGER, allowNull: true },
    rolId: { type: DataTypes.INTEGER, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'users',
  });

  return User;
};