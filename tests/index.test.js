const app = require("../src/index");
const sequelize = require("../src/config/database");

describe("Inicialização do servidor", () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("deve conectar ao banco e iniciar o servidor", async () => {

    const authenticateMock = jest
      .spyOn(sequelize, "authenticate")
      .mockResolvedValue();

    const syncMock = jest
      .spyOn(sequelize, "sync")
      .mockResolvedValue();

    const logMock = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    const listenMock = jest
      .spyOn(app, "listen")
      .mockImplementation((porta, callback) => {
        callback();

        return {
          close: jest.fn()
        };
      });

    await app.iniciarServidor();

    expect(authenticateMock)
      .toHaveBeenCalled();

    expect(syncMock)
      .toHaveBeenCalled();

    expect(listenMock)
      .toHaveBeenCalledWith(
        3000,
        expect.any(Function)
      );

    logMock.mockRestore();

  });


  test("deve tratar erro de conexão com o banco", async () => {

    jest
      .spyOn(sequelize, "authenticate")
      .mockRejectedValue(
        new Error("Erro de conexão")
      );

    const errorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await app.iniciarServidor();

    expect(errorMock)
      .toHaveBeenCalled();

    errorMock.mockRestore();

  });

});