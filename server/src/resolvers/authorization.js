import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

/**
 * Verifica a role da conta conectada na variavel 'me' do contexto
 */
export const isAdmin = (parent, args, { me: { role } }) => {
    return role === 'ADMIN'
        ? skip
        : new ForbiddenError('Not authorized as admin.')
}

/**
 * Verifica se a variavel me está populada no context do Apollo Server (usuário autenticado)
 * @param {*} parent 
 * @param {*} args 
 * @param {*} param2 
 */
export const isAuthenticated = (parent, args, { me }) =>
    me ? skip : new ForbiddenError('Not authenticated as user.');

/**
 * Verifica se o usuário passado é dono da Message sendo alterada ou deletada
 * @param {*} parent 
 * @param {*} param1 
 * @param {*} param2 
 */
export const isMessageOwner = async (parent, { id }, { models, me }, ) => {
    const message = await models.Message.findByPk(id, { raw: true });
    if (message.userId !== me.id) {
        throw new ForbiddenError('Not authenticated as owner.');
    }
    return skip;
};