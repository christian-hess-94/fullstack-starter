# FullStack Starter

#### Descrição
Este projeto inclui as pastas `server` e `client` para criação de aplicação fullstack com [NodeJS](http://nodejs.org), [ReactJS](http://reactjs.org) e [PostgreSQL](http://postgresql.org)

#### Instalação

>###### Programas
>   - Instalar [Chocolatey](https://chocolatey.org/docs/installation)

>###### Dependencias Chocolatey
>Execute os comandos abaixo em um CMD com privilégios administrativos
>- `choco install -y nodejs-lts yarn` Linguagens e package managers
>- `choco install -y vscode notepadplusplus firacode` IDEs e editores de texto
>- `choco install -y postgresql pgadmin4` Banco de dados
>- `choco install -y git github-desktop` Versionamento de código

> ###### Dependencias globais NodeJS
> No mesmo CMD com privilégios administrativos execute `node -v` para validar a instalação do NodeJS
> Caso o comando não seja reconhecido, execute `refreshenv` e tente novamente
> Execute os comandos abaixo
> `npm install -g create-react-app nodemon sequelize-cli` Frameworks e build-tools
> `npm install -g eslint prettier` Estilo e organização de código


> ###### Dependencias locais
>   * Abra qualquer uma das pastas (`server` ou `client`)
>   * Execute o comando `npm install`

#### Inicialização

>###### Simulânea (server + client)
>   * Execute o arquivo `start.bat`
>   * Aguarde o build de ambos os projetos concluir

>###### Individual (server ou client)
>   * Abra a pasta correspondente
>   * Execute o arquivo `start.bat` dentro de projeto
>   * Aguarde o build individual concluir

#### Documentação
>   * Abra a pasta correspondente
>   * Abra o arquivo `README.md`
>   * Link direto
>       * [client](https://github.com/christian-hess-94/fullstack-starter/blob/master/client/README.md)
>       * [server](https://github.com/christian-hess-94/fullstack-starter/blob/master/server/README.md)

#### Estrutura e ambiente

>###### Módulos principais da estrutura do server
>    - [ExpressJS](https://expressjs.com/)
>    - [Apollo GraphQL Server](https://www.apollographql.com/)
>    - [Sequelize ORM e CLI](https://sequelize.org/)
>    - [bcrypt](https://www.npmjs.com/package/bcrypt)
>    - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

>###### Módulos principais da estrutura do client
>    - [ReactJS](https://reactjs.org/)
>    - [Create-React-App](https://create-react-app.dev/docs/getting-started)
>    - [Apollo Boost GraphQL Client](https://www.apollographql.com/)