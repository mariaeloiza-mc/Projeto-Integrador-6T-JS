/* const http = require('http'); //require = import;  http = biblioteca padrao do node que permite o fluxo de rede
const hostname = '0.0.0.0';  //hostname = ip que ele vai aceitar solicitações (pode ser nome de domínio, maquina local) 
//como estamos no git tem que usar 000 para executar portas //
const port = 3000;

//createServer = importado da biblioteca http / req = request / res= response 
// => - arrow function, tudo oq foi processado pela variável ela vai retornar
const server = http.createServer ((req, res) => {
    res.statusCode = 200; //statusCode é uma variável, tudo depois de res. é uma variável pois ele é um objeto
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Servidor Node.js rodando com sucesso no Codespaces! \n') //aparece na tela
});

server.listen(port, hostname, () => {
    console.log(`Servidor rodando na porta ${port}`); //aparece no terminal
});

// Para rodar: node index.js no terminal */

const express = require('express');
const produtoRoutes = require ('./routes/produto.routes'); //para usar o que foi criado em produto routes e controller, precisa chamar ele aqui
const sequelize = require("./config/database");

const app = express();
const port = 3000;

app.use(express.json());
app.use('/produtos', produtoRoutes);

app.get('/', (req, res) => {
  res.send('Servidor rodando com sucesso!');
});

/*const prod = [
    {id:1, nome:"Notebook", preco: 6700},
    {id:2, nome:"Mouse", preco: 120}
];

app.get("/produtos", (req, res) => {
    res.status(200).json(prod);
});*/


async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco realizada com sucesso.");
    await sequelize.sync();

    app.listen(port, () => {
      console.log(`Servidor iniciado em http://localhost:${port}`);
    });
  } 
  
  catch (error) {
    console.error("Erro ao conectar com o banco:",
    error);
  }
}

/*essa parte do código serve para importar o app sem precisar abrir a prota primeiro */
if (require.main === module) {
  iniciarServidor();
}

module.exports = app;
module.exports.iniciarServidor = iniciarServidor;
