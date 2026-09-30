const service = require("../src/services/produto.service");
const controller = require("../src/controllers/produto.controller");

describe("Produto Controller - tratamento de erros", () => {

  test("listar deve retornar 500 se o service falhar", async () => {

    jest.spyOn(service, "listar")
      .mockRejectedValueOnce(new Error("Erro no banco"));

    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controller.listar(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Erro no banco"
    });

  });


  test("buscarPorId deve retornar 500 se o service falhar", async () => {

    jest.spyOn(service, "buscarPorId")
      .mockRejectedValueOnce(new Error("Erro no banco"));

    const req = {
      params: {
        id: 1
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controller.buscarPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Erro no banco"
    });

  });


  test("excluir deve retornar 500 se ocorrer erro", async () => {

    jest.spyOn(service, "excluir")
      .mockRejectedValueOnce(new Error("Erro ao excluir"));

    const req = {
      params: {
        id: 1
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controller.excluir(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Erro ao excluir"
    });

  });

});