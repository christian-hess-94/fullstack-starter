const RoleModel = (sequelize, DataTypes) => {
	const Role = sequelize.define('role', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: 'ROLE needs a name'
				}
			},
		},
	})

	// Criação de relacionamentos com models (belongsTo, hasMany)
	Role.associate = models => {
		Role.belongsTo(models.User)
	}

	Role.findFromId = async userId => {
		let roles = await Role.findAll({
			where: { userId },
		});
		return roles;
	};

	return Role
}


export default RoleModel