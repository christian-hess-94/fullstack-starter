import { skip } from 'graphql-resolvers';

/**
 * Verifica a role da conta conectada na variavel 'me' do contexto
 */
export const isAdmin = (parent, args, { me: { role } }) => {
    return role === 'ADMIN'
        ? skip
        : new ForbiddenError('Not authorized as admin.')
}