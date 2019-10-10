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

const getMe = async req => {
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
		const message = error.message
			.replace('SequelizeValidationError: ', '')
			.replace('Validation error: ', '');
		return {
			...error,
			message,
		};
	},
	context: async ({ req, connection }) => {
		// console.log('Starting context')
		if (connection) {
			// console.log('Starting subscription connection')
			return {
				models
			}
		}
		if (req) {
			const me = await getMe(req); //Verifica o token passado no header x-token e salva na variável 'me'
			// console.log('Starting query and mutation context')
			return {
				models,
				me,
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
		createUsersWithMessagesForTesting();
	}
	httpServer.listen({ port: 8000 }, () => {
		// console.clear()
		console.log('Apollo Server on http://localhost:8000/graphql');
	});
})

const createUsersWithMessagesForTesting = async () => {
	await models.User.create(
		{
			username: 'Christian',
			email: 'christianhess94@gmail.com',
			role: 'ADMIN',
			password: '12345678',
			messages: [
				{
					text: 'Published the Road to learn React',
					//createdAt: date.setSeconds(date.getSeconds() + 1),
				},
			],
		},
		/* {
			include: [models.Message],
		}, */
	);
	await models.User.create(
		{
			username: 'ddavids',
			email: 'ddavids@gmail.com',
			password: '12345678',
			messages: [
				{
					text: 'Happy to release ...',
				},
				{
					text: 'Published a complete ...',
				},
			],
		},
		/* {
			include: [models.Message],
		}, */
	);

};