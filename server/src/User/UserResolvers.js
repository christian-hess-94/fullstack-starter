import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { isAdmin, isAuthenticated } from '../resolvers/globals';
const UserResolvers = {
    Query: {
        readAllUsers: async (parent, args, { models }) => {
            const users = await models.User.findAll()
            return users
        },
        loggedUser: async (parent, args, { models, loggedUser }) => {
            if (!loggedUser) {
                return null
            }
            return await models.User.findByPk(loggedUser.id)
        },
        readOneUser: async (parent, { id }, { models }) => {
            return await models.User.findByPk(id)
        },
    },
    Mutation: {
        addRoleToUser: combineResolvers(
            isAuthenticated,
            isAdmin,
            async (parent, { userId, name }, { models }) => {
                console.log(`Adicionando role ${name} para o user ${userId}`)
                try {
                    await models.Role.create({ name, userId })

                    return true
                } catch (error) {
                    console.log('ERROR: ', error.parent.detail)
                    throw new Error(error.parent.detail)
                }
                /* const novoUsuario = await models.User.update({ role: 'ADMIN' }, { where: { username } })
                if (novoUsuario[0] == 1) {
                    return true
                }
                return false */
            }),
        createUser: async (parent, { username, email, password }, { models, secret }, ) => {
            const user = await models.User.create({
                username,
                email,
                password,
            });
            return { token: createToken(user, secret, '10h') };
        },
        login: async (parent, { login, password }, { models, secret }, ) => {
            const user = await models.User.findByLogin(login);
            if (!user) {
                throw new UserInputError('Nenhum usuário com essas credenciais');
            }
            const isValid = await user.validatePassword(password);
            if (!isValid) {
                throw new AuthenticationError('Invalid password.');
            }

            const roles = await models.Role.findFromId(user.id);
            console.log('Roles found: ', roles)
            return { token: createToken(user, secret, '10h', roles) };
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
        roles: async (user, args, { models }) => {
            return await models.Role.findAll({
                where: {
                    userId: user.id
                }
            })
        }
    }
}
const createToken = async (user, secret, expiresIn, roles) => {
    const { id, email, username } = user;
    console.log('Roles sendo inseridas no token: ', roles)
    return await jwt.sign({ id, email, username, roles }, secret, {
        expiresIn,
    });
};


export default UserResolvers