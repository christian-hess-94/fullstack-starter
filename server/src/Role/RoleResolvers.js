import { combineResolvers } from 'graphql-resolvers';
import { isAdmin, isAuthenticated } from '../resolvers/authorization';
const RoleResolvers = {
    Query: {
        readAllRoles: async (parent, args, { models }) => {
            const roles = await models.Role.findAll()
            return roles
        },
        readOneRole: async (parent, { id }, { models }) => {
            return await models.Role.findByPk(id)
        },
    },
    Mutation: {
        createRole: async (parent, { name }, { models }, ) => {
            await models.Role.create({ name });
            return true
        },
        deleteRole: combineResolvers(
            isAuthenticated,
            isAdmin,
            async (parent, { id }, { models }) => {
                return await models.Role.destroy({ where: { id }, });
            },
        ),
    },
    Role: {
    }
}

export default RoleResolvers
