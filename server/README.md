# Server

#### Descrição

Projeto de serviço web usando as tecnologias
[`Apollo GraphQL Server`](https://www.apollographql.com/)  [`ExpressJS`](https://expressjs.com/) [`Sequelize`](https://sequelize.org/)


#### Instalação

> - Siga os passos do [`README.md`](https://github.com/christian-hess-94/fullstack-starter/blob/master/README.md) geral
> - **Importante**: Certifique que o VSCode e NodeJS estão instalados está instalado
> - Clique com botão direito na pasta do projeto e selecione a opção `Open in VSCode`
> - Após o VSCode abrir, pressione `CTRL + "`  para abrir o terminal integrado
> - Execute o comando 
>```batch 
>npm install --save
>``` 


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

### Estrutura do projeto
Nesta seção há uma explicação das diversas pastas e arquivos do projeto
Entre parênteses existe o contexto de uso da pasta dentro do projeto

> ##### Pastas
>> ###### Config (Sequelize)
>> Usada para realizar migrations no banco de dados, em ambientes de desenvolvimento, teste e produção, a partir do arquivo `config.json` 
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
>>> ###### Para iniciar os testes:
>>> - Configure a variável .env/NODE_ENV para `'test'`
>>> - Remova o `#` na linha da variável TEST_DATABASE
>>> - Execute o comando `npm test`
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
### Sequelize ORM
O Sequelize é uma biblioteca que mapeia tabelas do banco de dados em JS.
Quando o projeto é iniciado, o sequelize realiza um processo chamado `Sync` que criar e configura o banco de dados a partir dos arquivos de mapeamento, chamados de **`models`**
Durante o Sync, novas tabelas criadas em arquivos de models são criadas e dados iniciais que tenham sido configurados são inseridos.
Caso modificações precisem ser feitas após a criação do banco e das tabelas, **`migrations`**
são usadas.

#### Sync
O Sync é executado toda vez que o projeto é reiniciado. O sync realiza a checagem se algum Model novo foi criado e faz a criação da tabela correspondente no banco de dados, se ela não existir.

Para que o sync possa criar as tabelas no banco de dados, a referencia do arquivo `src/models.js` deve estar sempre atualizada com os novos models que serão criados:


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

O arquivo models.js é importado e injetado no contexto do Apollo GraphQL Server e Sequelize dentro do arquivo `index.js`

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
#### Models
Arquivos que mapeiam e executam queries SQL contra as tabelas no banco de dados.
Estes arquivos ficam localizados dentro da pasta `src`, separados pelas pastas de cada entidade
Nestes arquivos podem ser criados os campos de cada tabela do banco de dados e inserir validações preliminares que podem impedir que dados incorretos sejam inseridos.

Os arquivos de Models são criados com a nomenclatura `NOME_DA_ENTIDADEModel.js` e devem ser inseridos no arquivo `src/models.js` para que sejam inseridos no contexto do Apollo Server GraphQL e Sequelize


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

#### Modo de testes
O projeto vem pré-configurado para usar executar o código em um ambiente controlado de teste.
No modo de testes, algumas funções são ativadas:
1. O banco de dados é trocado para um banco de testes
2. A função de Sync realiza uma reinicialização completa sempre que o projeto é reinicializado
3. Os arquivos de Chai Testing dentro da pasta `tests` podem ser utilizados para testar funcionalidades

##### Como habilitar o Modo de testes
1. Abra o arquivo `.env` e modifique as variáveis NODE_ENV e TEST_DATABASE_NAME
```sql
NODE_ENV=test #Modifique para test
...

TEST_DATABASE_NAME=novo_nome #Modifique o nome do banco de dados de teste e remova o # do início
...
```
2. Caso o banco de dados de teste esteja localizado em uma máquina diferente, configure a variável `test` dentro do arquivo `config/config.json`
```js
{
  (...)
  "test": {
    "username": "username", //Nome de usuário para acesso
    "password": "password", //Senha para acesso
    "database": "database", //Nome do banco de dados (mesmo nome de NODE_ENV)
    "host": "127.0.0.1", //IP de acesso à máquina
    "dialect": "postgres", 
    "operatorsAliases": false
  },
  (...)
}
```
3. Execute o comando `npm start` 
e verifique se a mensagem "SERVIÇO INICIADO EM MODO DE TESTES" aparece no console

4. Para voltar ao modo de desenvolvimento, pare o serviço e modifique o arquivo `.env` para:
```sql
NODE_ENV=development #Modifique para development
...
# TEST_DATABASE_NAME=novo_nome #Adicione # no início
...
```