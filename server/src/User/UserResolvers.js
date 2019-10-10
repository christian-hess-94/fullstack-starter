import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { isAdmin, isAuthenticated } from '../resolvers/authorization';
export default {
    Query: {
        users: async (parent, args, { models }) => {
            const users = await models.User.findAll()
            return users
        },
        user: async (parent, { id }, { models }) => {
            return await models.User.findByPk(id)
        },
        me: async (parent, args, { models, me }) => {
            if (!me) {
                return null
            }
            return await models.User.findByPk(me.id)
        },
    },
    Mutation: {
        turnUserIntoAdmin: async (parent, { username }, { models, /* me */ }) => {
            const novoUsuario = await models.User.update({ role: 'ADMIN' }, { where: { username } })
            if (novoUsuario[0] == 1) {
                return true
            }
            return false
        },
        signUp: async (parent, { username, email, password }, { models, secret }, ) => {
            const user = await models.User.create({
                username,
                email,
                password,
            });
            return { token: createToken(user, secret, '10h') }; //30m => 30 minutos para expirar
        },
        signIn: async (parent, { login, password }, { models, secret }, ) => {
            const user = await models.User.findByLogin(login);
            if (!user) {
                throw new UserInputError(
                    'No user found with this login credentials.',
                );
            }
            const isValid = await user.validatePassword(password);
            if (!isValid) {
                throw new AuthenticationError('Invalid password.');
            }
            return { token: createToken(user, secret, '10h') }; //30m => 30 minutos para expirar
        },
        deleteUser: combineResolvers(
            isAuthenticated,
            isAdmin,
            async (parent, { id }, { models }) => {
                return await models.User.destroy({
                    where: { id },
                });
            },
        ),
    },
    User: {
    }
}
const createToken = async (user, secret, expiresIn) => {
    const { id, email, username, role } = user;
    return await jwt.sign({ id, email, username, role }, secret, {
        expiresIn,
    });
};
