const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router
  .get("/pessoas", PessoaController.pegaPessoasAtivas)
  .get("/pessoas/todos", PessoaController.pegaTodasAsPessoas)
  .get("/pessoas/:id", PessoaController.pegaUmaPessoa)
  .get("/pessoas/:estudanteId/matricula", PessoaController.pegatriculas)
  .post("/pessoas", PessoaController.criaPessoa)
  .post("/pessoas/:id/restaura", PessoaController.restauraPessoa)
  .put("/pessoas/:id", PessoaController.atualizaPessoa)
  .delete("/pessoas/:id", PessoaController.deletaPessoa)
  .get("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.pegaUmaMatricula)
  .post("/pessoas/:estudanteId/matricula", PessoaController.criaMatricula)
  .post("/pessoas/:estudanteId/matricula/:matriculaId/restaura", PessoaController.restauraMatricula)
  .put("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.atualizaMatricula)
  .delete("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.apagaMatricula);

module.exports = router;
