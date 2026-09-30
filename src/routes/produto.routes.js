/* 
const express = require ("express");
const router = express.Router(); //chama uma intstancia de uma classe e coloca a referencia na variavel router

const controller = 
require("../controllers/produto.controller"); //chama a controladora de produto

router.get("/", controller.listar); 
//rota - em um caso de ter dois gets, é só adicionar nomes diferentes depois da barra para chamar o específico
router.post("/", controller.criar); //rota

module.exports = router; 
//além de fazer o require (import) do arquivo de rota no index.js, é necessário exportar a variavel de rota para usar
*/

const express = require("express");
const router = express.Router();

const controller = 
  require("../controllers/produto.controller");

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

module.exports = router;