import bcrypt from 'bcrypt';
const UserModel = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		username: {
			type: DataTypes.STRING,
			unique: {
				args: true,
				msg: 'Usuário deve ser único'
			},
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: 'Usuário deve ter username'
				}
			},
		},
		email: {
			type: DataTypes.STRING,
			unique: {
				args: true,
				msg: 'Email já cadastrado no sistema'
			},
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: 'Usuário deve ter email'
				},
				isEmail: {
					args: true,
					msg: 'Email em formato inválido'
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: 'Usuário deve ter senha'
				},
				len: {
					args: [7, 42],
					msg: 'Senha deve ter no mínimo 7 caracteres'
				}
			},
		},
		role: {
			type: DataTypes.STRING,
		},
	})

	User.associate = (models) => {
		User.hasMany(models.Role, { onDelete: 'CASCADE' })
	}

	User.findByLogin = async login => {
		console.log('GEtting user')
		let user = await User.findOne({
			where: { username: login },
		});
		if (!user) {
			user = await User.findOne({
				where: { email: login },
			});
		}
		return user;
	};

	User.beforeCreate(async user => {
		// eslint-disable-next-line require-atomic-updates
		user.password = await user.generatePasswordHash();
	});

	User.prototype.generatePasswordHash = async function () {
		const saltRounds = 10;
		return await bcrypt.hash(this.password, saltRounds);
	};

	User.prototype.validatePassword = async function (password) {
		return await bcrypt.compare(password, this.password);
	};

	return User
}


export default UserModel