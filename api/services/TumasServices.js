const Services = require("./Services");
const database = require("../models");

class TurmasServices extends Services {
  constructor() {
    super("Turmas");
  }
  //métodos específicos do controlador de Turmas.
  async pegaTodosOsRegistros(where = {}) {
    return await database[this.nomeDoModelo].findAll({ where: { ...where } });
  }
}

module.exports = TurmasServices;
