/* quando não se tem banco e  se utiliza array em memória:
é uma classe opcional pois o array já funciona como armazenamento
*/

/* quando possui banco, a classe model passa ter um papel + importante
o service passa usar o model/repository para persistencia
fazer essa separação facilita testes e evolução
*/ 

/* Esse código foi comentado para iniciar module com banco
class Produto {
  constructor({ id, nome, preco }) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
  }

  estaEmPromocao() {
    return this.preco < 100;
  }
}
*/

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Produto = sequelize.define(
  "Produto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },

    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  },
  {
    tableName: "produtos"
  }
);

module.exports = Produto;