const database = require("../models");

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  async pegaTodosOsRegistros() {
    return await database[this.nomeDoModelo].findAll();
  }

  async pegaUmRegistro(where = {}) {
    return await database[this.nomeDoModelo].findOne({ where: { ...where } });
  }
  async criaRegistro(dados) {
    return await database[this.nomeDoModelo].create(dados);
  }

  async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
    return await database[this.nomeDoModelo].update(dadosAtualizados, {
      where: { id: id },
      transacao,
    });
  }
  async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
    return await database[this.nomeDoModelo].update(dadosAtualizados, {
      where: { ...where },
      transacao,
    });
  }
  async apagaRegistro(id) {
    return await database[this.nomeDoModelo].destroy({ where: { id: id } });
  }
  async restauraRegistro(id) {
    return await database[this.nomeDoModelo].restore({ where: { id: id } });
  }
  async consultaRegistroApagado(id) {
    return database[this.nomeDoModelo].findOne({
      paranoid: false,
      where: {
        id: Number(id),
      },
    });
  }
  async encontraEContaRegistros(where = {}, agregadores) {
    return await database[this.nomeDoModelo].findAndCountAll({
      where: {
        ...where,
      },
      ...agregadores,
    });
  }
}

module.exports = Services;
