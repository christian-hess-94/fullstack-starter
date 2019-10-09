
//Importações de extensões de Schemas
import DefaultSchema from './_Default/_DefaultSchema';
import ConsagradoSchema from './Consagrado/ConsagradoSchema'

//Insierir schemas para Schema Stitching
const FullSchema = [
    DefaultSchema,
    ConsagradoSchema
]
export default FullSchema