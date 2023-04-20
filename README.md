<h1>CSV Balance</h1>
<p>Este projeto foi desenvolvido como parte de um desafio técnico para avaliar habilidades em NestJS, ReactJS e PostgreSQL.</p>

<p>Este projeto é uma aplicação web que permite o upload de um arquivo CSV contendo documento e saldo para usuários, salvando os dados em uma tabela com documento, saldo e data. A aplicação também inclui as seguintes funcionalidades:</p>
<br>
<li>Autenticação com e-mail e senha (senha criptografada)</li>

<li>Recuperação de senha</li>
<br>
<p>O CSV pode ter mais de uma linha por usuário, e a aplicação soma os saldos. Se o usuário enviar um novo CSV no mesmo dia, a aplicação exclui logicamente os saldos anteriores e cria novos registros.</p>

<br><br>
<h1>Executando o projeto localmente</h1>
<p>Para executar o projeto localmente, siga os seguintes passos:</p>

<h2>Pré-requisitos</h2>
<li>Node.js (versão 12 ou superior)</li>
<li>PostgreSQL</li>
<li>Um provedor de e-mail, como o Gmail, com permissão para acesso a aplicativos menos seguro</li>
<br><br>
<h1>Clonando o repositório</h1>
<h3>Comando: https://github.com/felipesantosdd/Teste_Tecnico_Back.git</h3>
<p>Entre na pasta do projeto usando:</p>
<h3>cd Teste_Tecnico_Back</h3>
<br>


<h1>Instalando as dependências</h1>
<p>No diretório raiz do projeto, execute o seguinte comando para instalar as dependências do projeto:</p>
<h3>npm install</h3>

<h3></h3>

<h1>Configurando as variáveis de ambiente</h1>
<p>Na raiz do projeto, tem um arquivo example.env, renomeio-o para .env e adicione as suas variaveis de ambiente<p>

<h1>Configurando o banco de dados</h1>
<p>Após instalar as dependencias, e adicionar as variaveis de ambiente, utilze o comando:<p>
<h3>npx prisma migrate dev</h3>
<br/>
<br/>
<h1>Executando o servidor</h1>
<p>Depois de tudo configurado, hora da parte boa, use o comando:<p>
<h3>npm run start:prod</h3>

<h1>End Points<h1>
<p>A Aplicação conta com os seguintes end points<p>

<h1>Users</h1>
<h2>POST/users</h2>
<h2>GET/users</h2>
<H2>GET/users/:id</H2>
<H2>UPDATE/users/:id</h2>
<H2>DELETE/users/:id</h2>
<br>
<h1>Auth<h1>
<h2>POST/auth<h2>
<H2>POST/users/reset-email-password</h2>
<H2>PATCH/users/reset-password/:id</h2>
<br></br>
<h1>Balances<h1>
<H2>POST/balances/import</h2>
<H2>GET/balances</h2>
<H2>GET/balances/:id</h2>
<H2>DELETE/balances/:id</h2>