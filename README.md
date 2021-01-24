# cadastro-desenvolvedor

## Tecnologias e ferramentas utilizadas:
#### Controle de Versão
 - Git

#### Gerenciador de Pacotes
 - Yarn

#### Front-end
 - React (Hooks)
 - Typescript
 - reactstrap (Visual)
 - styled-components (Estilização de componente)
 - Formik (Gerenciador de formulário)
 - react toastify (Notificação de erros)
 - sweetalert2 (Alertas de listagem e confirmação)
 - Yup (Validador de formulário)
 - Axios (Rest)
 
#### Back-end
 - Node.Js
 - Typescript
 - Express
 - Mongoose
 - Nodemon
 
#### Banco de Dados
 - MongoDB
 
## Passo a Passo - (Após clonar o repósitório)
### Iniciando a aplicação com Docker
 - Abrir o terminal do sistema no caminho do repositório `cadastro-desenvolvedor` e executar o comando `docker-compose up`.
 - O Back-end será executado no endereço http://localhost:3333.
 - O Front-end será executado no endereço http://localhost:3000.
 - O Back-end se conectará com o banco de dados no ip local do Docker, configurado na variável de ambiente DB_CONNECTION `172.17.0.1:27017`
 - Todos os testes do Front-end (Unitários) e do Back-end (Integração), serão executados junto com a aplicação.
 
### Iniciando a aplicação sem Docker
#### Front-end
 - Abrir o terminal do sistema no caminho `cadastro-desenvolvedor/web`
 - Baixar o node_modules com o comando `yarn`
 - Executar o comando `yarn start` para iniciar a aplicação.
 - Será executado no endereço http://localhost:3000
  
#### Back-end
 - No arquivo `.env`, alterar o caminho da variável `DB_CONNECTION` para se conectar com base local `mongodb://localhost:27017/gazinCaique`.
 - Abrir o terminal do sistema no caminho `cadastro-desenvolvedor/server`
 - Baixar o node_modules com o comando `yarn`
 - Executar o comando `yarn start` para iniciar a aplicação.
 - Será executado no endereço http://localhost:3333
 
#### Testes Front-end
- Abrir o terminal do sistema no caminho `cadastro-desenvolvedor/web`
- Executar o comando `yarn test`

#### Testes Back-end
- No arquivo `.env.test`, alterar o caminho da variável `DB_CONNECTION` para se conectar com base local `mongodb://localhost:27017/gazinCaiqueTest`.
- Abrir o terminal do sistema no caminho `cadastro-desenvolvedor/server`
- Executar o comando `yarn test`
 
### Observação
Os ambientes de aplicação e testes foram separados. A aplicação será executada consumindo uma base de dados com nome `gazinCaique`. O ambiente de teste de integração consumirá uma base com nome `gazinCaiqueTest`.
