import express from 'express';
import { ApolloServer } from './src/_Default/node_modules/apollo-server-express';
import cors from 'cors';
import FullSchema from './src/FullSchema';

//Acesso ao arquivo .env
require('dotenv').config()

//Configuração serviço express
const app = express();
app.use(cors());

//Validar usuário em cada requisição
const validateUser = async req => {
    const token = req.headers['Authorization'];
    if (token) {
        try {
            return await jwt.verify(token, process.env.SECRET);
        } catch (e) {
            throw new AuthenticationError('Sessão do usuário expirada.');
        }
    }
};

//Configuração schemas
const schema = FullSchema
const resolvers = ...
const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req, connection }) => {
        // console.log('Starting context')
        if (connection) {
            // console.log('Starting subscription connection')
            return {
                models
            }
        }
        if (req) {
            const loggedUser = await validateUser(req); //Verifica o token passado no header Authorization e salva na variável 'loggedUser'
            // console.log('Starting query and mutation context')
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
});
server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
});