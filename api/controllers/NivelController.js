const { NiveisServices } = require("../services");
const niveisServices = new NiveisServices();

class NivelController {
  static async pegaTodosOsNiveis(req, res) {
    try {
      const todosOsNiveis = await niveisServices.pegaTodosOsRegistros();
      return res.status(200).json(todosOsNiveis);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaUmNivel(req, res) {
    const { id } = req.params;
    try {
      const nivel = await niveisServices.pegaUmRegistro({ id });
      return res.status(200).json(nivel);
    } catch (error) {
      return res.status(500).json(erro.message);
    }
  }
  static async criaNivel(req, res) {
    const novoNivel = req.body;
    try {
      const novoNivelCriado = await niveisServices.criaRegistro(novoNivel);
      return res.status(200).json(novoNivelCriado);
    } catch (error) {
      return res.status(500).json(erro.message);
    }
  }
  static async atualizaNivel(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await niveisServices.atualizaRegistro(novasInfos, Number(id));
      const nivelAtualizado = await database.Niveis.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(nivelAtualizado);
    } catch (error) {
      return res.status(500).json(erro.message);
    }
  }
  static async deletaNivel(req, res) {
    const { id } = req.params;
    try {
      await niveisServices.apagaRegistro(Number(id));
      return res.status(200).json({ mensage: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(erro.message);
    }
  }
  static async restauraNivel(req, res) {
    const { id } = req.params;
    try {
      await niveisServices.restauraRegistro(Number(id));
      return res.status(200).json({ mensage: `id ${id} restaurado` });
    } catch (error) {
      return res.status(500).json(erro.message);
    }
  }
}

module.exports = NivelController;
