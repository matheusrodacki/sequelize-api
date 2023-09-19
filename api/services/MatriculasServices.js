const Services = require("./Services");
const database = require("../models");

class MatriculasServices extends Services {
  constructor() {
    super("Matriculas");
  }
  //métodos específicos do controlador de Matriculas.
  async pegaTodosOsRegistros(where = {}) {
    return await database[this.nomeDoModelo].findAll({ where: { ...where } });
  }
}

module.exports = MatriculasServices;
