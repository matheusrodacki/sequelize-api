const database = require("../models");

//controllers/NivelController.js

class NivelController {
  static async pegaTodosOsNiveis(req, res) {
    try {
      const todosOsNiveis = await database.Niveis.findAll();
      return res.status(200).json(todosOsNiveis);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaUmNivel(req, res) {
    const { id } = req.params;
    try {
      const nivel = await database.Niveis.findOne({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json(nivel);
    } catch (error) {
      return res.status(500).json(erro.message);
    }
  }
  static async criaNivel(req, res) {
    const novoNivel = req.body;
    try {
      const novoNivelCriado = await database.Niveis.create(novoNivel);
      return res.status(200).json(novoNivelCriado);
    } catch (error) {
      return res.status(500).json(erro.message);
    }
  }
  static async atualizaNivel(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await database.Niveis.update(novasInfos, { where: { id: Number(id) } });
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
      await database.Niveis.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensage: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(erro.message);
    }
  }
  static async restauraNivel(req, res) {
    const { id } = req.params;
    try {
      await database.Niveis.restore({ where: { id: Number(id) } });
      return res.status(200).json({ mensage: `id ${id} restaurado` });
    } catch (error) {
      return res.status(500).json(erro.message);
    }
  }
}

module.exports = NivelController;
