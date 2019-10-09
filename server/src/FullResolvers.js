
//Importações de extensões de Resolvers
import DefaultResolver from './_Default/_DefaultResolver';
import ConsagradoResolver from './Consagrado/ConsagradoResolver'

//Insierir Resolvers para Resolver Stitching
const FullResolver = [
    DefaultResolver,
    ConsagradoResolver
]
export default FullResolver