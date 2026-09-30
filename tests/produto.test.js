process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../src/index");
const sequelize = require("../src/config/database");
const Produto = require("../src/models/produto.models");


beforeAll(async () => {

  await sequelize.authenticate();

  await sequelize.sync({
    force: true
  });

});


beforeEach(async () => {

  await Produto.destroy({
    where: {}
  });

});


afterAll(async () => {

  await sequelize.close();

});

describe("POST /produtos", () => {
  test("deve criar um produto", async () => {
    const resposta = await request(app)
      .post("/produtos")
      .send({
        nome: "Notebook",
        preco: 3500
      });

    expect(resposta.status).toBe(201);
    expect(resposta.body.nome)
      .toBe("Notebook");
    expect(Number(resposta.body.preco))
      .toBe(3500);
    expect(resposta.body.id)
      .toBeDefined();

  });

  test("não deve criar produto sem nome", async () => {
    const resposta = await request(app)
      .post("/produtos")
      .send({
        preco: 3500
      });

    expect(resposta.status).toBe(400);
    expect(resposta.body.mensagem)
      .toBe("nome e preco são obrigatórios");

  });

});

describe("GET /produtos", () => {
  test("deve listar os produtos", async () => {

    await Produto.create({
      nome: "Notebook",
      preco: 3500
    });

    await Produto.create({
      nome: "Mouse",
      preco: 120
    });

    const resposta = await request(app)
      .get("/produtos");


    expect(resposta.status).toBe(200);
    expect(resposta.body)
      .toHaveLength(2);
    expect(resposta.body[0].nome)
      .toBe("Notebook");
  });
});

describe("GET /produtos/:id", () => {

  test("deve encontrar um produto", async () => {
    const produto = await Produto.create({
      nome: "Mouse",
      preco: 120
    });

    const resposta = await request(app)
      .get(`/produtos/${produto.id}`);

    expect(resposta.status)
      .toBe(200);
    expect(resposta.body.nome)
      .toBe("Mouse");
  });

  test("deve retornar 404 para produto inexistente", async () => {
    const resposta = await request(app)
      .get("/produtos/999");

    expect(resposta.status)
      .toBe(404);
    expect(resposta.body.mensagem)
      .toBe("Produto não encontrado");
  });
});

describe("PUT /produtos/:id", () => {

  test("deve atualizar um produto", async () => {
    const produto = await Produto.create({
      nome: "Notebook",
      preco: 3500
    });

    const resposta = await request(app)
      .put(`/produtos/${produto.id}`)
      .send({
        nome: "Notebook Gamer",
        preco: 5000
      });

    expect(resposta.status)
      .toBe(200);
    expect(resposta.body.nome)
      .toBe("Notebook Gamer");
    expect(Number(resposta.body.preco))
      .toBe(5000);

  });

  test("deve retornar 404 ao atualizar produto inexistente", async () => {
    const resposta = await request(app)
      .put("/produtos/999")
      .send({
        nome: "Teste",
        preco: 100
      });

    expect(resposta.status)
      .toBe(404);
  });
});

describe("DELETE /produtos/:id", () => {

  test("deve excluir um produto", async () => {
    const produto = await Produto.create({
      nome: "Mouse",
      preco: 120
    });


    const resposta = await request(app)
      .delete(`/produtos/${produto.id}`);

    expect(resposta.status)
      .toBe(204);

    const produtoExcluido =
      await Produto.findByPk(produto.id);

    expect(produtoExcluido)
      .toBeNull();

  });


  test("deve retornar 404 ao excluir produto inexistente", async () => {
    const resposta = await request(app)
      .delete("/produtos/999");

    expect(resposta.status)
      .toBe(404);
  });
});

describe("GET /", () => {

  test("deve confirmar que o servidor está funcionando", async () => {
    const resposta = await request(app)
      .get("/");

    expect(resposta.status)
      .toBe(200);

    expect(resposta.text)
      .toBe("Servidor rodando com sucesso!");

  });
});

test("deve retornar 400 ao atualizar sem nome", async () => {

  const produto = await Produto.create({
    nome: "Notebook",
    preco: 3500
  });

  const resposta = await request(app)
    .put(`/produtos/${produto.id}`)
    .send({
      preco: 5000
    });

  expect(resposta.status).toBe(400);

  expect(resposta.body.mensagem)
    .toBe("nome e preco são obrigatórios");

});

test("não deve criar produto sem preço", async () => {

  const resposta = await request(app)
    .post("/produtos")
    .send({
      nome: "Notebook"
    });

  expect(resposta.status).toBe(400);

  expect(resposta.body.mensagem)
    .toBe("nome e preco são obrigatórios");

});