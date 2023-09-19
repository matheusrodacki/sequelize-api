const { PessoasServices } = require("../services");
const pessoasServices = new PessoasServices();

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
      const umaPessoa = await pessoasServices.pegaUmRegistro({ id });
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
      await pessoasServices.atualizaRegistro(novasInfos, Number(id));
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
}

module.exports = PessoaController;
