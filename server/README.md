# Server


#### Descrição

Projeto de serviço web usando as tecnologias
[`Apollo GraphQL Server`](https://www.apollographql.com/)  [`ExpressJS`](https://expressjs.com/) [`Sequelize`](https://sequelize.org/)

---

#### Instalação

> - Siga os passos de instalação do [`README.md`](https://github.com/christian-hess-94/fullstack-starter/blob/master/README.md) geral do projeto
> - **Importante**: Certifique que o VSCode e NodeJS estão instalados
> - Clique com botão direito na pasta do projeto e selecione a opção `Open in VSCode`
> - Após o VSCode abrir, pressione `CTRL + "`  para abrir o terminal integrado
> - Execute o comando 
>```batch 
>npm install --save
>``` 

---

#### Inicialização
Utilize um dos métodos abaixo para iniciar o projeto

> Execute o arquivo `start.bat`
> Uma nova janela do CMD será aberta 
> Aguarde o projeto ser inicializado


> Clique com botão direito na pasta do projeto e selecione a opção `Open in VSCode`
> Após o VSCode abrir, pressione `CTRL + "`  para abrir o terminal integrado
> Execute o comando 
>```batch 
>npm start
>``` 
>e aguarde o projeto ser inicializado

---

### Estrutura do projeto
Nesta seção há uma explicação das diversas pastas e arquivos do projeto
Entre parênteses existe o contexto de uso da pasta dentro do projeto

> ##### Pastas
>> ###### Config (Sequelize)
>> Usada para realizar migrations no banco de dados, em ambientes de desenvolvimento, teste e produção, a partir do arquivo `config.json`. 
>>Permitir configurar diferentes locais para diversos bancos de dados
>
>> ###### Migrations (Sequelize)
>> Possui os arquivos das migrations propriamente ditas. 
>> Os arquivos recebem os comandos que serão executados nas tabelas no banco de dados (inserir,  deletar e renomear colunas, etc)
>>>
>
>> ###### Models (Sequelize)
>> Pasta criada automaticamente ao inserir o sequelize no projeto
>> Configura o Sequelize para executar tarefas no banco de dados a partir do valor da variável `.env/NODE_ENV`
>
>> ###### Seeders (Sequelize)
>> Pasta criada automaticamente ao inserir o sequelize no projeto
>> Possui arquivos de Seeders do Sequelize
>
>> ###### src (Apollo GraphQL Server, ExpressJS)
>> Pasta com os arquivos-fonte das entidades do banco de dados e do projeto
>>> ###### Subpastas
>>> - **resolvers**: Possui os arquivos com funções globais a serem executadas pelas queries GraphQL
>>> - **Entity_name**: Possui os arquivos que:
>>>      - `*Model.js`: Representa a entidade no banco de dados 
>>>      - `*Schema.js`: Mapeia a entidade na API GraphQL 
>>>      - `*Resolvers.js`: Lógica executada pelas Queries e Mutations do GraphQL
>>
>>>###### Arquivos
>>> - `models.js`: Mescla todos os Models para exportação única
>>> - `schemas.js`:  Mescla todos os Schemas para exportação única
>>> - `resolvers.js`: Mescla todos os Resolvers para exportação única
>
>> ###### tests (Apollo GraphQL Server, ExpressJS, Sequelize)
>> Possui arquivos de testes que podem ser executados separadamente
>> Faz uso da biblioteca de testes: [`Chai`](https://www.npmjs.com/package/chai)
>> Apenas executa testes se o projeto for iniciado em modo de teste 
>>(ensinado abaixo, na seção **Modo de Testes**)
> ##### Arquivos
> - **.babelrc**: Configuração de uso das novas versões do JS (ES6 e ES+)
> - **.env**: Arquivo com as variáveis de ambiente do projeto
> - **.eslintrc**: Arquivo com as configurações do ESlint para correção de código
> - **.prettier**: Arquivo com as configurações do Prettier para formatação de código
> - **.travis.yml**: Arquivos de integração continua Travis CI
> - **index.js**: Arquivo de inicialização do serviço
> - **package-lock.json**: Arquivo que trava o uso de outros package managers além do NPM
> - **package.json**: Arquivo de configurações de dependencias e contexto do NodeJS no projeto
---
### Variáveis de ambiente
O NodeJS permite a configuração de variáveis de ambiente que podem ser acessadas em todo o projeto. 
Essas variáveis ficam armazenadas no arquivo oculto `.env` presente na raíz do projeto

>Caso não consiga ver o arquivo `.env`, habilite `Exibir arquivos ocultos` nas opções da pasta do projeto

As variáveis presentes são:
>**.env**
>```ini
># Configura o ambiente do projeto. Pode ser development, test ou production
>NODE_ENV=test 
># Nome do banco de dados
>DATABASE=postgres
># Nome do usuario do banco de dados
>DATABASE_USER=postgres
># Senha do usuário para acesso
>DATABASE_PASSWORD=postgres
># Nome do banco de dados de teste. Comentado inicialmente
>#TEST_DATABASE_NAME=testdatabase
># String de conexão. Alterar os dados para refletir os inseridos acima. Comentado inicialmente
>#DATABASE_CONNECTION_STRING=postgres://USERNAME:PASSWORD@localhost:5432/NAME
># Chave usada para criar o token JWT durante requisições GraphQL
>JWT_SECRET=wr3r23fwfwefwekwself.2456342.dawqdq
>```
---
### Sequelize ORM
O Sequelize é uma biblioteca que mapeia tabelas do banco de dados em JS.
Quando o projeto é iniciado, o sequelize realiza um processo chamado `Sync` que criar e configura o banco de dados a partir dos arquivos de mapeamento, chamados de **`models`**
Durante o Sync, novas tabelas criadas em arquivos de models são criadas e dados iniciais que tenham sido configurados são inseridos.
Caso modificações precisem ser feitas após a criação do banco e das tabelas, **`migrations`**
são usadas.

#### Configurar banco de dados POSTGRES
O Sequelize necessita que o banco de dados seja configurado. Este projeto vem com um banco de dados padrão configurado. 
As configurações do banco de dados devem ser feitas dentro dos arquivos `.env` e `config/config.json`  
>**.env**
>```ini
>DATABASE_NAME = Nome do banco de dados a ser acessado (deve ser criado manualmente)
>DATABASE_USER = Nome do usuário com acesso ao banco de dados
>DATABASE_PASSWORD = Senha do usuário para acesso ao banco de dados
>TEST_DATABATE_NAME = Nome do banco de dados de teste (Opcional)
>```

No arquivo config.json, modifique as seguintes variáveis em todos os três tipos de ambiente de acesso:
(`development`, `test`, `production`)
>**.config/config.json**
>```js
> (...)
>{
>   "username": "Nome de usuário de acesso ao banco",
>   "password": "Senha de acesso ao banco",
>   "database": "Nome do banco de dados",
>   "host": "Ip de acesso à maquina, se necessário",
>   (...)
>},
>(...)
>```

**Importante**: Os usuários e senha de acesso aos três tipos de banco devem ser os mesmos


#### Sync
O Sync é executado toda vez que o projeto é reiniciado. O sync realiza a checagem se algum Model novo foi criado e faz a criação da tabela correspondente no banco de dados, se ela não existir.


#### Models
Arquivos que mapeiam e executam queries SQL contra as tabelas no banco de dados.
Estes arquivos ficam localizados dentro da pasta `src`, separados pelas pastas de cada entidade
Nestes arquivos podem ser criados os campos de cada tabela do banco de dados e inserir validações preliminares que podem impedir que dados incorretos sejam inseridos.

Os arquivos de Models são criados com a nomenclatura `NOME_DA_ENTIDADE/NOME_DA_ENTIDADEModel.js` e devem ser inseridos no arquivo `src/models.js` para que sejam inseridos no contexto do Apollo Server GraphQL e Sequelize

Para que o Sync possa criar as tabelas no banco de dados, a referencia do arquivo `src/models.js` deve estar sempre atualizada com os novos models que serão criados:


>**src/models.js**
>```js
>(...)
>const models = {
>    User: sequelize.import('./User/UserModel'),
>    Role: sequelize.import('./Role/RoleModel'),
>    //Insira a importação dos novos Models aqui
>   //NOMEDOMODEL: sequelize.import('PATH_DO_MODEL'),
>};
>(...)
>export { sequelize };
>export default models
>
>```

O arquivo `models.js` é importado e injetado no contexto do Apollo GraphQL Server e Sequelize dentro do arquivo `index.js`

>**index.js**
>```js
>(...)
>import models, { sequelize } from './src/models';
>(...)
>context: async ({ req, connection }) => {
>   if (connection) {
>       return {
>           models //Models no context do Apollo GraphQl Server para cada subscription GraphQL
>       }
>   }
>   if (req) {
>       const loggedUser = await getLoggedUser(req); 
>       return {
>           models, //Models no context do Apollo GraphQl Server para cada requisição GraphQL
>           loggedUser,
>           secret: process.env.JWT_SECRET,
>           loaders: {
>               user: new DataLoader(keys => batchUsers(keys, models)),
>           },
>       };
>   }
>},
>(...)
>```


#### Migrations
Migrations são usadas para fazer alterações na estrutura das tabelas do banco de dados após sua criação. Essas alterações incluem criação de novas colunas, renomeação, etc.
Os arquivos de migrations ficam localizados na pasta `migrations` e podem ser executadas através da linha de comando do Sequelize (Sequelize-cli)

Para criar um novo arquivo de migration:
```batch 
sequelize migration:generate --name=migration_name
```

Após configurar o arquivo de migration:
```batch 
sequelize db:migrate
```

*Importante*: Após ser feita uma migration que altere as colunas em alguma tabela, essas colunas devem ser mapeadas no Model correspondente

---
#### Modo de testes
O projeto vem pré-configurado para usar executar o código em um ambiente controlado de teste.
No modo de testes, algumas funções são ativadas:
1. O banco de dados é trocado para um banco de testes
2. A função de Sync realiza uma reinicialização completa sempre que o projeto é reinicializado
3. Os arquivos de Chai Testing dentro da pasta `tests` podem ser utilizados para testar funcionalidades

##### Como habilitar o Modo de testes
1. Abra o arquivo `.env` e modifique as variáveis NODE_ENV e TEST_DATABASE_NAME
>**.env**
>```ini
># Modifique para test
>NODE_ENV=test 
>...
># Modifique o nome do banco de dados de teste e remova o # do início
>TEST_DATABASE_NAME=novo_nome 
>...
>```
2. Caso o banco de dados de teste esteja localizado em uma máquina diferente, configure a variável `test` dentro do arquivo `config/config.json`
>**config/config.json**
>```js
>{
>  (...)
>  "test": {
>    "username": "Nome de usuário de acesso ao banco",
>    "password": "Senha de acesso ao banco",
>    "database": "Nome do banco de dados",
>    "host": "Ip de acesso à maquina, se necessário",
>    (...)
>  },
>  (...)
>}
>```
3. Execute o comando 
```batch
npm start
``` 
e verifique a presença da mensagem **SERVIÇO INICIADO EM MODO DE TESTES** no console.

##### Como desabilitar o Modo de testes
1. Para voltar ao modo de desenvolvimento, pare o serviço e modifique o arquivo `.env`:
>**.env**
>```ini
># Modifique para development ou production, baseado na necessidade
>NODE_ENV=development 
>...
># Adicione # no início
>#TEST_DATABASE_NAME=novo_nome 
>...
>```

---

### Apollo GraphQL Server

Este projeto faz uso do framework Apollo GraphQL Server para mapear a estrutura do banco de dados em uma API GraphQL

#### Funcionamento

O GraphQL funciona ao mapear a estrutura do banco de dados em arquivos chamados `Schemas` e os expondo por um entry point de onde os dados podem ser requisitados através de requisições `HTTP Post` ou pelo `Apollo GraphQL Client`

A maneira de interação entre o cliente e a API GraphQL é feita através de arquivos chamados `Resolvers`. Cada `Schema` tem o seu arquivo `Resolver` com a lógica a ser executada para cada de requisição recebida

As requisições que o GraphQL recebe podem ser de três tipos:

||Query|Mutation|Subscription
|:---:|:---:|:---:|:---:|
|Descrição|Operações de leitura|Operações de modificação|Leitura contínua de dados|
|Operação CRUD|Read|Create Update Delete| Read|
|Descrição|Requisições feitas para apenas ler dados|Requisições feitas para alterar dados| Requisições feitas para apenas ler dados continuamente (atualizam automaticamente em caso de alteração na base de dados)|

O projeto não precisa que o Apollo seja configurado de maneira alguma. Basta criar os Schemas necessários e iniciar o projeto com `npm start`

---

#### Schemas

Schemas são arquivos que mapeiam as entidades do banco de dados na API GraphQL e as operações que podem ser executadas sobre essas entidades. 

Cada Schema mapeia essas funcionalidades que são executadas pelo Resolver correspondente

O projeto possui o arquivo `src/schemas.js` que se encarrega de criar o Schema inicial da API e concatenar os Schemas espalhados pela pasta `src`

Os arquivos de Schemas são criados com a nomenclatura `NOME_DA_ENTIDADE/NOME_DA_ENTIDADESchema.js` e adicionam os dados na estrutura vazia criada no defaultSchema. Esse processo se chama **Schema Stitching**

>**src/schemas.js**
>```js
>import { gql } from "apollo-server-express";
>import Entitiy1Schema from "./Entitiy1/Entitiy1Schema";
>import Entitiy2Schema from "./Entitiy2/Entitiy2Schema";
>//Importar os demais Schemas
>
>//Schema inicial com os tipos Query, Mutation e Subscription sendo criados (obrigatório)
>//'scalar Date' permite a utilização de timestamps no GraphQL
>const defaultSchema = gql`
>  scalar Date 
>  
>  type Query{
>    _:Boolean
>  }
>  type Mutation{
>    _:Boolean
>  }
>  type Subscription{
>    _:Boolean
>  }
>`;
>// Exportação do Schema inicial concatenado com os demais Schemas (Schema Stitching)
>const schemas = [defaultSchema, UserSchema, RoleSchema]
>export default schemas
>```


O arquivo `src/schemas.js` deve ser inserido no arquivo `index.js` para que sejam injetados no contexto do Apollo Server GraphQL
>**index.js**
>```js
>(...)
>import schemas from './src/schemas';
>(...)
>const server = new ApolloServer({
>   typeDefs: schemas,
> (...)
>})
>(...)
>```

**Importante**: Schemas também são comumente chamados de **typeDefs** ou **Type Definitions** (Definição de tipos)

#### Operações
Abaixo estão listadas os três tipos de operações que podem ser realizadas em uma API GraphQL, **Query**, **Mutation** e **Subscription**
>##### Queries
>Queries são tipos criados dentro de Schemas e mapeam as operações de Read que podem ser executadas em cima de um determinado tipo. Por padrão, os dados retornados são em JSON

>##### Mutations
>Mutations são tipos criados dentro de Schemas e mapeam as operações de Create, Update e Delete que podem ser executadas em cima de um determinado tipo. 

>##### Subscriptions
>Subscriptions são tipos criados dentro de Schemas e mapeam as operações de Read que podem ser executadas em cima de um determinado tipo, porém essas operações são automática e são re-executadas toda vez que os dados retornados pela Subscription são alterados.
>
>Nesse caso, o cliente envia uma requisição de inscrição (subscribe) à GraphQL API e fica constantemente recebendo respostas atualizadas até cancelar a inscrição

**Importante**: Em todos os casos, o tipo de retorno deve ser especificado e se pode, ou não, ser nulo

---
### Parâmetros
Queries, Mutations e Subscriptions podem receber parâmetros que são utilizados dentro do Resolver correspondente para filtrar ou realizar outras funcionalidades no decorrer da operação.
Os parâmetros também devem ser mapeados no Schema quando a operação é criada e podem ser recuperados no Resolver correspondente.
O exemplo abaixo cria uma query que recebe dois parâmetros e retorna a soma dos mesmos

> **src/nome_entidade/algumSchema.js**
>```js
>const algumSchema = gql`
>extend Query{
>   # Query que recebe dois parâmetros Int e retorna a soma (Int)
>   soma(param1: Int, param2: Int): Int 
>}
>`
>```

>**src/nome_entidade/algumResolvers.js**
>```js
>const algumResolvers = {
>    Query: {
>        //Pega os parâmetros especificados no Schema
>        soma: (_,__,{param1, param2}) => { 
>            //Retorna a soma
>            return param1 + param2 
>        }
>    }
>}
>```

>**Query executada**
>```js
>Query{
>    soma(1,2)
>}
>```

>**Retorno**
>```json
>{
>    "data":{
>        "soma": 3
>    }
>}
>```

---

#### Resolvers
Resolvers são os arquivos que contém a lógica executada pelas operações definidas no Schema.

Cada arquivo de Schema possui um arquivo de Resolver corresponte, e todas as operações definidas no arquivo de Schema também devem ser definidas no arquivo do Resolver

O resolver deve mapear as mesmas operações do Schema, quer sejam Queries, Mutations ou Subscriptions. 

O resolver também pode modificar os dados que são retornados pelos Types definidos no Schema

>**resolver**
>```js
>const Resolver = {
>   Query: {
>       Query1: ()=>{
>          //Faz alguma coisa
>       },
>       Query2: ()=>{
>          //Faz alguma coisa
>       },
>   },
>   Mutation: {
>       Mutation1: ()=>{
>          //Faz alguma coisa
>       },
>       Mutation2: ()=>{
>          //Faz alguma coisa
>       },
>   },
>   //Modificando o campo 'roles' do Type User definido no Schema
>   User: {
>        roles: async (user, args, { models }) => {
>            return await models.Role.findAll({
>                where: {
>                    userId: user.id
>                }
>            })
>        }
>    }
>}
>```

Os resolvers podem recuperar os parâmetros passados nas queries e o contexto do Apollo GraphQL Server

>**resolver**
>```js
>const Resolver = {
>    Query: {
>        funcao: async (
>            parent, //Objeto pai que pode ter parâmetros especificos. Neste caso é Query
>            params, //Parâmetros passados na Query, Mutation ou Subscription
>            context //Contexto com os objetos passados para o Apollo GraphQL Server
>        ) => {
>            //Faz alguma coisa
>        },
>    }
>}
>```

##### Context

O Context é um elemento importante da funcionalidade do Resolver, pois nele é onde podemos buscar as referencias aos Models e ao usuário que fez a requisição (através das informações contidas no token)

>**src/index.js**
>```js
>const server = new ApolloServer({
>(...)
>    context: async ({ req, connection }) => {
>        if (connection) {
>            return {
>                models //Retorna apenas models em caso de Subscription
>            }
>        }
>        if (req) {
>            const loggedUser = await getLoggedUser(req); //Verifica o token passado no header x-token e salva na variável 'loggedUser'
>            return {
>                models, //Adiciona os models no Context
>                loggedUser, //Adiciona os usuário logado no Context 
>                secret: process.env.JWT_SECRET, //Adiciona a chave de descriptografia do JWT
>                loaders: { //Adiciona objeto de batching para queries mais performáticas no banco de dados
>                    user: new DataLoader(keys => batchUsers(keys, models)), 
>                },
>            };
>        }
>    },
>})
>(...)
>```

>**src/User/UserResolvers.js**
>```js
>deleteUser: combineResolvers(
>   isAuthenticated,
>   isAdmin,
>   async (
>       _, //Não faz uso do elemento parent
>       { id }, //Busca o parâmetro ID da query
>       { models } //Acessa a context e retorna os models
>   ) => {
>       return await models.User.destroy({ //Faz uso do model User para deletar do banco >de dados
>           where: { id },
>       });
>   },
>),
>```

##### Função CombineResolvers e Resolvers globais

A função CombineResolvers pode ser usada para enfileirar a execução de diversas funções. 
```js
combineResolvers(
    Resolver1,
    lResolver2,
    Resolver3,
    (...)
)
```


Isso permite a criação de funções Resolvers globais que podem ser chamadas em qualquer Resolver. 

Essas funções tem acesso a todos os mesmo parâmetros que os Resolvers comuns e podem, por exemplo, ser usadas para identificar se o token possui acesso de ADMIN.

As funções Resolver globais ficam localizadas no arquivo `src/resolvers/globals.js`. 

Abaixo o código da função que verifica se o token possui a role ADMIN 

```js
import { skip } from 'graphql-resolvers';

export const isAdmin = (
    //Possui acesso aos mesmo parâmetros que todos os resolvers
    parent, 
    args, 
    context
    ) => {
        const {loggedUser} = context
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
```

Para continuar a execução para o próximo resolver, cada Resolver Global deve retornar o objeto `skip`. Caso outra coisa seja retornada (neste caso o objeto ForbiddenError), a execução é parada por completo

>```js
>//Importação dos Resolvers globais para serem usados
>import { isAdmin, isAuthenticated } from '../resolvers/globals';
> (...)
>combineResolvers(
>   isAuthenticated, //Se retornar skip, avança para a próxima execução
>   isAdmin, //Se retornar skip, avança para a próxima execução
>   async (parent,params,context) => {
>       //Faz alguma coisa
>   }
>)
>```

---

#### JWT (JsonWebToken)

JWT implica na criação de um Token criptografado que contém as informações do usuário que está realizando qualquer operação com o back-end.
Para criar o token, é necessária uma senha privada. A senha fica localizada dentro do arquivo `.env`:

>**.env**
>```ini
>(...)
># Senha usada para criptografar o Token
>JWT_SECRET=wr3r23fwfwefwekwself.2456342.dawqdq
>```

O token faz parte do Context global do Apollo GraphQL Server:

>**index.js**
>```js
>context: async ({ req, connection }) => {
>    (...)
>    return {
>        models,
>        loggedUser,
>        secret: process.env.JWT_SECRET, //Adiciona chave no Context
>        (...)
>    };
>    (...)
>```

Como o token criptografa as informações do User, a função de criação fica localizada dentro da lógica das operações do User, no arquivo `src/User/UserResolvers.js`:

>**src/User/UserResolvers.js**
>```js
>const createToken = async (
>    user, //Informações do usuário no banco de dados (tabela users)
>    secret, //Chave secreta no arquivo .env
>    expiresIn, //Tempo de validade do token (padrão 10 horas)
>    roles //Roles do usuário no banco de dados (tabela roles)
>    ) => {
>    const { id, email, username } = user;
>    console.log('Roles sendo inseridas no token: ', roles)
>    //Criação e retorno do token JWT
>    return await jwt.sign({ id, email, username, roles }, secret, {
>        expiresIn,
>    });
>};
>```

A função createToken é usada pelas funções createUser e login do arquivo `src/User/UserResolver.js`. As funções createUser e login são definidas no arquivo `src/User/UserSchema.js`. Dentro do Schema também é definido um tipo para o Token

>**src/User/UserSchema.js**
>```js
>const UserSchema = gql`
>(...)
>   extend type Mutation{
>       createUser(username: String!, email: String!, password: String!): Token!
>       login(login: String!, password: String!): Token!
>   }
>   type Token {
>       token: String!
>   }
>(...)
>`
>```

>**src/User/UserResolvers.js**
>```js
>const UserResolvers = {
>(...)
>Mutation: {
>   (...)
>   createUser: async (
>       parent, 
>       { username, email, password },  //Recupera os parâmetros
>       { models, secret }, //Busca os models do banco de dados e a chave de criptografia
>   ) => {
>   //Cria o usuário no banco de dados
>       const user = await models.User.create({
>           username,
>           email,
>           password,
>       });
>       //Executa a função createToken passando os dados do usuário, chave e tempo de validade
>       return { token: createToken(user, secret, '10h') }; 
>   },
>   login: async (
>       parent, 
>       { login, password }, //Recupera os parâmetros
>       { models, secret }, //Busca os models do banco de dados e a chave de criptografia
>   ) => {
>       const user = await models.User.findByLogin(login); //Busca a credencial do login
>       if (!user) {
>           throw new UserInputError('Nenhum usuário com essas credenciais');
>       }
>       const isValid = await user.validatePassword(password); //Valida a senha
>       if (!isValid) {
>           throw new AuthenticationError('Invalid password.');
>       }
>       const roles = await models.Role.findFromId(user.id);
>       //Executa a função createToken passando os dados do usuário, chave, 
>       //tempo de validade e as roles do usuário
>       return { token: createToken(user, secret, '10h', roles) }; 
>   },
>}
>(...)
>```

#### GraphQL Playground

GraphQL Playground é a parte gráfica de testes do Apollo GraphQL Server. 
O playground é uma tela onde podem ser feitos testes rápidos das queries criadas nos Schemas.

Para acessar o GraphQL Playground, basta acessar http://localhost:8000/graphql em qualquer navegador.

O GraphQL Playground não atualiza automaticamente com as mudanças nos Schemas do projeto. Ao adicionar novas Queries, Mutations, Types e Subscriptions, a pagina no navegador deve ser atualizada manualmente com F5

