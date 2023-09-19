const database = require("../models");

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  async pegaTodosOsRegistros() {
    return await database[this.nomeDoModelo].findAll();
  }

  async pegaUmRegistro(id) {
    return await database[this.nomeDoModelo].findOne({ where: { id: id } });
  }
  async criaRegistro(dados) {}

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
  async apagaRegistro(id) {}
  async cancelaRegistro(id) {}
}

module.exports = Services;
