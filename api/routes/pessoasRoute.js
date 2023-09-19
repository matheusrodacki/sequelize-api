const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router
  //Pessoas
  .get("/pessoas", PessoaController.pegaTodasAsPessoas)
  .get("/pessoas/ativas", PessoaController.pegaPessoasAtivas)
  .get("/pessoas/:id", PessoaController.pegaUmaPessoa)
  .post("/pessoas", PessoaController.criaPessoa)
  .post("/pessoas/:id/restaura", PessoaController.restauraPessoa)
  .post("/pessoas/:estudanteId/cancela", PessoaController.cancelaPessoa)
  .put("/pessoas/:id", PessoaController.atualizaPessoa)
  .delete("/pessoas/:id", PessoaController.deletaPessoa)
  .get("/pessoas/:estudanteId/matricula", PessoaController.pegaMatriculas);

module.exports = router;
