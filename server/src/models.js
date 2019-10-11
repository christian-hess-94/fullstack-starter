import Sequelize from 'sequelize';

require('dotenv').config()

const sequelize = new Sequelize(
    process.env.TEST_DATABASE_NAME && process.env.NODE_ENV == 'test' ?
        process.env.TEST_DATABASE_NAME
        : process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});
const models = {
    User: sequelize.import('./User/UserModel'),
    Role: sequelize.import('./Role/RoleModel'),
};
Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});
export { sequelize };
export default models;