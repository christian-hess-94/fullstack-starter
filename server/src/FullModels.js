import Sequelize from 'sequelize';

require('dotenv').config()

const sequelize = new Sequelize(process.env.TEST_DATABASE || process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});
const models = {
    Usuario: sequelize.import('./Usuario/UsuarioModel'),
    Consagrado: sequelize.import('./Consagrado/ConsagradoModel'),
};
Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});
export { sequelize };
export default models;