import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

/**
 * Verifica se o token da conta conectada possui a role ADMIN
 */
export const isAdmin = (parent, args, { loggedUser }) => {
    const { roles } = loggedUser
    let isAdmin = false
    roles.forEach(role => { //Verifica se a roles do token possuem a role ADMIN
        if (role.name === 'ADMIN') {
            isAdmin = true
            console.log('Usuário conectado é ADMIN')
        }
    })
    return isAdmin ? skip : new ForbiddenError('Usuário não é ADMIN')
}

/**
 * Verifica se a variavel loggedUser está populada no context do Apollo Server (usuário autenticado)
 * @param {*} parent 
 * @param {*} args 
 * @param {*} param2 
 */
export const isAuthenticated = (parent, args, { loggedUser }) =>
    loggedUser ? skip : new ForbiddenError('Not authenticated as user.');

/**
 * Verifica se o usuário passado é dono da Message sendo alterada ou deletada
 * @param {*} parent 
 * @param {*} param1 
 * @param {*} param2 
 */
export const isMessageOwner = async (parent, { id }, { models, loggedUser }, ) => {
    const message = await models.Message.findByPk(id, { raw: true });
    if (message.userId !== loggedUser.id) {
        throw new ForbiddenError('Not authenticated as owner.');
    }
    return skip;
};