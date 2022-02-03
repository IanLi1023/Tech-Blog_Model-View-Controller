const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config');
class User extends Model {

	checkPassword(pwd) {
		return bcrypt.compareSync(pwd, this.password);
	}
}
User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [3]
			}
		}
	},
	{
		hooks: {
			beforeCreate: async (newUserInfo) => {
				newUserInfo.password = await bcrypt.hash(newUserInfo.password, 10)
				return newUserInfo
			}, 
			beforeUpdate: async (updateUserInfo) => {
				updateUserInfo.password = await bcrypt.hash(updateUserInfo.password, 10)
				return updateUserInfo

		}
	},
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'User'
	}
);
module.exports = User;