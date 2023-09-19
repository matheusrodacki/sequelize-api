//const database = require("../models");
//const sequelize = require("sequelize");
const { PessoasServices, MatriculasServices } = require("../services");
const pessoasServices = new PessoasServices();
const matriculasServices = new MatriculasServices();

class PessoaController {
  //GET Pessoas
  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros();
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await pessoasServices.pegaRegistroAtivos();
      return res.status(200).json(pessoasAtivas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaUmaPessoa(req, res) {
    const { id } = req.params;
    try {
      const umaPessoa = await pessoasServices.pegaUmRegistro(id);
      return res.status(200).json(umaPessoa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  //POST Pessoas
  static async criaPessoa(req, res) {
    const novaPessoa = req.body;
    try {
      const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa);
      return res.status(200).json(novaPessoaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async restauraPessoa(req, res) {
    const { id } = req.params;
    try {
      await pessoasServices.restauraRegistro(id);
      return res.status(200).json({ mensage: `id ${id} restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async cancelaPessoa(req, res) {
    const { estudanteId } = req.params;
    try {
      await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId));

      return res.status(200).json({
        message: `matriculas ref. estudante ${estudanteId} canceladas`,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  //PUT Pessoas
  static async atualizaPessoa(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await pessoasServices.atualizaRegistro(novasInfos, id);
      const pessoaAtualizada = await pessoasServices.pegaUmRegistro(id);
      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  //DEL Pessoas
  static async deletaPessoa(req, res) {
    const { id } = req.params;
    try {
      await pessoasServices.apagaRegistro(id);
      return res.status(200).json({ mensage: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  //GETs Matriculas
  static async pegaMatriculas(req, res) {
    const { estudanteId } = req.params;
    try {
      const matriculas = await pessoasServices.pegaMatriculasPorEstudante({
        id: Number(estudanteId),
      });
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const umaMatricula = await matriculasServices.pegaUmRegistro({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res.status(200).json(umaMatricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaMatriculasPorTurma(req, res) {
    const { turmaId } = req.params;
    try {
      const todasAsMatriculas = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: Number(turmaId),
          status: "confirmado",
        },
      });
      return res.status(200).json(todasAsMatriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  //POST Matricula
  static async criaMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const novaMatriculaCriada = await database.Matriculas.create(
        novaMatricula
      );
      return res.status(200).json(novaMatriculaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async restauraMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res.status(200).json({ mensage: `id ${matriculaId} restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  //PUT Matriculas
  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const novasInfos = req.body;
    try {
      await database.Matriculas.update(novasInfos, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      const MatriculaAtualizada = await database.Matriculas.findOne({
        where: { id: Number(matriculaId) },
      });
      return res.status(200).json(MatriculaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  //DEL Matriculas
  static async apagaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.destroy({ where: { id: Number(matriculaId) } });
      return res.status(200).json({ mensagem: `id ${matriculaId} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaTurmasLotadas(req, res) {
    const lotacaoTurma = 2;
    try {
      const turmasLotadas = await database.Matriculas.findAndCountAll({
        where: {
          status: "confirmado",
        },
        attributes: ["turma_id"],
        group: ["turma_id"],
        having: sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`),
      });
      return res.status(200).json(turmasLotadas.count);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
