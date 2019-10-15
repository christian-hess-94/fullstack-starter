import http from 'http';
import express from 'express';
import jwt from 'jsonwebtoken'
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import DataLoader from 'dataloader';

import schema from './src/schemas';
import resolvers from './src/resolvers';
import models, { sequelize } from './src/models';

import cors from 'cors';

require('dotenv').config()

const app = express();
app.use(cors())

const getLoggedUser = async req => {
	const token = req.headers['x-token'];
	if (token) {
		try {
			return await jwt.verify(token, process.env.JWT_SECRET);
		} catch (e) {
			throw new AuthenticationError('Your session expired. Sign in again.');
		}
	}
};

const batchUsers = async (keys, models) => {
	console.log('batching users: ', keys)
	const users = await models.User.findAll({
		where: {
			id: keys,
		},
	});
	const batchedUsers = keys.map(key => {
		return users.find(user => user.id === key)
	});
	// console.log(batchedUsers)
	return batchedUsers
};

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	formatError: error => {
		console.log(error)
		// remove the internal sequelize error message
		// leave only the important validation error
		const messages = error.message
			.replace(/SequelizeValidationError: /g, '')
			.replace(/Validation error: /g, '')
			.replace(/\n/g, '')
			.split(',')
		// console.log(messages.split(','))
		console.log(messages)
		//const messages = gqlMessages.map(message=> message.replace('Validation error: ', ''))
		return {
			...error,
			messages,
		};
	},
	context: async ({ req, connection }) => {
		if (connection) {
			return {
				models
			}
		}
		if (req) {
			const loggedUser = await getLoggedUser(req); //Verifica o token passado no header x-token e salva na variável 'loggedUser'
			return {
				models,
				loggedUser,
				secret: process.env.JWT_SECRET,
				loaders: {
					user: new DataLoader(keys => batchUsers(keys, models)),
				},
			};
		}
	},
})


server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

//Inicia o projeto no modo de teste se NODE_ENV for 'test' e existir TEST_DATABASE_NAME
let isTesting = process.env.NODE_ENV == 'test' && !!process.env.TEST_DATABASE_NAME;

sequelize.sync({ force: isTesting }).then(() => { //Realiza sincronização dos models criados no sequelize com o banco de dados definir no arquivo .env (cria as tabelas)
	if (isTesting) {
		createAdminUser();
		console.clear()
		console.log('SERVIÇO INICIADO EM MODO DE TESTES')
	}
	httpServer.listen({ port: 8000 }, () => {
		// console.clear()
		console.log('Apollo Server on http://localhost:8000/graphql');
	});
})

const createAdminUser = async () => {
	await models.User.create(
		{
			username: 'ADMIN',
			email: 'ADMIN@admin.com',
			password: 'ADMIN!@#',
			roles: [
				{
					name: 'ADMIN'
				},
			],
		},
		{
			include: [models.Role],
		},
	);

};