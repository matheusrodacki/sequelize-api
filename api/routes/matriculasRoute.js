const { Router } = require("express");
const MatriculasConstroller = require("../controllers/MatriculaController");

const router = Router();

router
  .get(
    "/pessoas/:estudanteId/matricula/:matriculaId",
    MatriculasConstroller.pegaUmaMatricula
  )
  .get(
    "/pessoas/matricula/:turmaId/confirmadas",
    MatriculasConstroller.pegaMatriculasPorTurma
  )
  .get("/pessoas/matricula/lotada", MatriculasConstroller.pegaTurmasLotadas)
  .post("/pessoas/:estudanteId/matricula", MatriculasConstroller.criaMatricula)
  .post(
    "/pessoas/:estudanteId/matricula/:matriculaId/restaura",
    MatriculasConstroller.restauraMatricula
  )
  .put(
    "/pessoas/:estudanteId/matricula/:matriculaId",
    MatriculasConstroller.atualizaMatricula
  )
  .delete(
    "/pessoas/:estudanteId/matricula/:matriculaId",
    MatriculasConstroller.apagaMatricula
  );

module.exports = router;
