# Server


#### Descrição

Projeto de serviço web usando as tecnologias
[`Apollo GraphQL Server`](https://www.apollographql.com/)  [`ExpressJS`](https://expressjs.com/) [`Sequelize`](https://sequelize.org/)

---

#### Instalação

> - Siga os passos do [`README.md`](https://github.com/christian-hess-94/fullstack-starter/blob/master/README.md) geral
> - **Importante**: Certifique que o VSCode e NodeJS estão instalados está instalado
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
|Descrição|Leitura|Modificação|Leitra contínua|
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
>Queries são tipos criados dentro de Schemas e mapeam as operações de Read que podem ser >executadas em cima de um determinado tipo. Por padrão, os dados retornados são em JSON
>
>Queries podem receber parâmetros que são utilizados dentro do Resolver correspondente para >filtrar ou realizar outras funcionalidades no decorrer da operação.

>##### Mutations
>Mutations são tipos criados dentro de Schemas e mapeam as operações de Create, Update e Delete >que podem ser executadas em cima de um determinado tipo. 
>
>Queries podem receber parâmetros que são utilizados dentro do Resolver correspondente para >filtrar ou realizar outras funcionalidades no decorrer da operação.

>#### Subscriptions
>Subscriptions são tipos criados dentro de Schemas e mapeam as operações de Read que podem ser >executadas em cima de um determinado tipo, porém essas operações são automática e são >re-executadas toda vez que os dados retornados pela Subscription são alterados.
>
>Nesse caso, o cliente envia uma requisição de inscrição (subscribe) à GraphQL API e fica >constantemente recebendo respostas atualizadas até cancelar a inscrição

**Importante**: Em todos os casos, o tipo de retorno deve ser especificado e se pode ou não ser nulo

---
### Parâmetros
Queries, Mutations e Subscriptions podem receber parâmetros que são utilizados dentro do Resolver correspondente para filtrar ou realizar outras funcionalidades no decorrer da operação.
Os parâmetros também devem ser mapeados no Schema quando a operação é criada e podem se recuperados