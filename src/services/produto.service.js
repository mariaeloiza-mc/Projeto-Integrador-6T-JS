/* a classe service centraliza as regras de negócio e a lógica principal da aplicação
   ela busca, cria e altera os dados
   valida as regras da aplicação e orquestra as operações
   não depende de HTTP
*/

// importa o Model
const Produto = require("../models/produto.models");

/* esse código foi comentado para iniciar com model + banco
const produtos = [
  { id: 1, nome: "Notebook", preco: 3500 },
  { id: 2, nome: "Mouse", preco: 120 }
];

function listar() {
  return produtos;
}

function buscarPorId(id) {
  return produtos.find(p => p.id === Number(id));
}

// 4. A função criar atualizada com a Classe Produto e mantendo a validação
function criar(dados) {
  // Mantemos a regra de negócio que valida os dados
  if (!dados.nome || dados.preco == null) {
    throw new Error("nome e preco são obrigatórios");
  }

  // Usamos a classe Produto para instanciar o objeto
  const produto = new Produto({
    id: produtos.length + 1,
    nome: dados.nome,
    preco: dados.preco
  });

  produtos.push(produto);
  return produto;
}
*/

async function listar() {
  return await Produto.findAll();
}

async function buscarPorId(id) {
  return await Produto.findByPk(id);
}

async function criar(dados) {
  if (!dados || !dados.nome || dados.preco == null) {
    throw new Error("nome e preco são obrigatórios");
  }

  return await Produto.create({
    nome: dados.nome,
    preco: dados.preco
  });
}

async function atualizar(id, dados) {
  const produto = await Produto.findByPk(id);
  if (!produto) {
    return null;
  }
  if (!dados.nome || dados.preco == null) {
    throw new Error("nome e preco são obrigatórios");
  }

  produto.nome = dados.nome;
  produto.preco = dados.preco;

  await produto.save();
  return produto;
}

async function excluir(id) {
  const produto = await Produto.findByPk(id);
  if (!produto) {
    return false;
  }

  await produto.destroy();
  return true;
}

module.exports = { listar, buscarPorId, criar, atualizar, excluir}; 