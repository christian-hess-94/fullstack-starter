import http from 'http';
import express from 'express';
import jwt from 'jsonwebtoken'
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import DataLoader from 'dataloader';

import schema from './src/schema';
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
			return await jwt.verify(token, process.env.SECRET);
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
		// remove the internal sequelize error message
		// leave only the important validation error
		const messages = error.message
			.replace(/SequelizeValidationError: /g, '')
			.replace(/Validation error: /g, '')
			.replace(/\n/g, '')
			//.split(',')
		// console.log(messages.split(','))
		console.log(messages)
		//const messages = gqlMessages.map(message=> message.replace('Validation error: ', ''))
		return {
			// ...error,
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
				secret: process.env.SECRET,
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

let isTesting = !!process.env.TEST_DATABASE; //Faz o drop da base de dados caso exista a variavel de testes

sequelize.sync({ force: isTesting } /*Drop no database toda vez que for sincronizado */).then(() => { //Realiza sincronização dos models criados no sequelize com o banco de dados definir no arquivo .env (cria as tabelas)
	if (isTesting) {
		createAdminUser();
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